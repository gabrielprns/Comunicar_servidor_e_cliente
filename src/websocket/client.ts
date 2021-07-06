import {io} from "../http";
import {ConnectionService} from "../services/ConnectionsService"
import { UserService } from "../services/UsersService";
import { MessageService } from "../services/MessagesService";

interface IParams{
  text: string;
  email: string;
}

io.on("connect", (socket)=>{
  const connectionService = new ConnectionService();
  const usersService = new UserService();
  const messageService = new MessageService();
  
  socket.on("client_first_access", async(params)=>{
    const socket_id = socket.id;
    const {text, email}= params as IParams;
    let user_id = null

    const userExists = await usersService.findByEmail(email);

    if(!userExists){
      const user =await usersService.create(email);

      await connectionService.create({
        socket_id,
        user_id: user.id
    });
      user_id = user.id
    }else{
      user_id = userExists.id;
      const connection = await connectionService.findByUserId(userExists.id);
      if(!connection){
        await connectionService.create({
          socket_id,
          user_id: userExists.id
      });
    }else{
      connection.socket_id = socket_id;
      await connectionService.create(connection);
    }
  }

  await messageService.create({
    text,
    user_id
  });
  const allMessages = await messageService.listByUser(user_id);

  socket.emit("client_list_all_messages", allMessages);

  const allUsers = await connectionService.findAllWithoutAdmin();

  io.emit("admin_list_all_users", allUsers);
  
  });
  socket.on("client_send_to_admin", async(params)=>{
    const{text, socket_admin_id}=params;
    const socket_id = socket.id;
    const { user_id } = await connectionService.findBySocketID(socket_id);
    
    const message = await messageService.create({
      text,
      user_id
    });

    io.to(socket_admin_id).emit("admin_receive_message",{
      message,
      socket_id
    })
  });
  socket.on("disconnect", async () => {
    console.log(socket.id);
    await connectionService.deleteBySocketId(socket.id);
  });
});