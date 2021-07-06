import { 
  Entity, 
  Column, 
  CreateDateColumn, 
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn
} from "typeorm" ;

import { v4 as uuid } from "uuid"
import { User } from "./User";

@Entity("connections")
class connection{
  @PrimaryColumn()
  id : string;

  @Column()
  admin_id:string;
 
  @Column()
  socket_id: string;

  @JoinColumn({name:"user_id"})
  @ManyToOne(()=>User)
  user:User;
 
  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  Updated_at: Date;

  constructor(){
    if(!this.id){
      this.id= uuid();
    }
  
  }

}
export{connection}