import uploads from './config/upload'
import {Router} from "express";
import { AnxFilesController } from "./controller/AnxFilesController";
import { MessagesController } from "./controller/MessagesController";
import { SettingsController } from "./controller/SettingsController";
import { UsersController } from "./controller/UserController";
const routes= Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messageController = new MessagesController();
const anxFilesController = new AnxFilesController();



routes.post("/settings", settingsController.create);
routes.get("/settings/:username", settingsController.findByUsername);
routes.put("/settings/:username", settingsController.update);

routes.post("/users", usersController.create);

routes.post("/message", messageController.create);
routes.get("/message/:id", messageController.showByUser);

routes.post("/file", anxFilesController.create);
routes.get("/file/:id", anxFilesController.showByUser);


routes.get('/uploads_2',(req,res) => {
  res.sendFile('./temp/uploads', { root: __dirname });
  })


routes.post('/uploads_2', uploads.single('recfile'),  (req, res)  => {
  try {
      res.send('Arquivo enviado com sucesso: ' + req.file.filename);
  } catch (error) {
      console.log(error);
  }
 
})


export{routes};