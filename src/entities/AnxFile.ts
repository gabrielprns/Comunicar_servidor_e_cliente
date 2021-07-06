import { 
  Entity, 
  Column, 
  CreateDateColumn, 
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm" ;

import { v4 as uuid } from "uuid"
import { User } from "./User";

@Entity("files")
class File{
  @Column()
  name_of_file:string;

  @PrimaryColumn()
  id : string;

  @Column()
  admin_id:string;
 

  @JoinColumn({name:"user_id"})
  @ManyToOne(()=>User)
  user:User;
 
  @Column()
  user_id: string;

  @Column()
  size: number ;

  @Column()
  url:string;

  @CreateDateColumn()
  created_at: Date;

  constructor(){
    if(!this.id){
      this.id= uuid();
    }
  
  }

}
export{File}