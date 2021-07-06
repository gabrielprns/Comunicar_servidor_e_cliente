import {Request, Response} from "express";
import { AnxFilesService } from "../services/AnxFilesService";

class AnxFilesController{

  async create(request: Request, response: Response){
    const {name_of_file, admin_id, size, url, user_id} =request.body;
  
    const anxFilesService = new AnxFilesService();
    const File = await anxFilesService.create({name_of_file, admin_id, size, url, user_id
    });
    return response.json(File);
    }
  
    async showByUser(request: Request, response: Response){
      const{id}= request.params;
      const anxFilesService = new AnxFilesService();
      const list = await anxFilesService.listByUser(id);
      return response.json(list);
    }
  
  }
  export {AnxFilesController}; 