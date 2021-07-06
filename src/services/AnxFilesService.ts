import { Double, getCustomRepository, Repository } from "typeorm";
import { File } from "../entities/AnxFile";
import { AnxFilesRepository } from "../repositories/AnxFilesRepository";

interface IAnxFilesCreate {
  name_of_file:string;
  admin_id?: string;
  size: number;
  url:string;
  user_id:string;
}

class AnxFilesService{
  private anxFilesRepository: Repository <File>;

  constructor(){
    this.anxFilesRepository = getCustomRepository(AnxFilesRepository);
  }
  async create({name_of_file, admin_id, size, url, user_id}:IAnxFilesCreate){
    

    const files = this.anxFilesRepository.create({
      name_of_file,
      admin_id,
      size,
      url,
      user_id


    });

    await this.anxFilesRepository.save(files);

    return files;
 }

 async listByUser(user_id: string){

  const list = await this.anxFilesRepository.find({
    where: {user_id},
    relations: ["user"],
  });
  return list;

 }
}
export {AnxFilesService}