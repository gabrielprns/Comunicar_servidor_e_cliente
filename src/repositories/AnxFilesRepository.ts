import {Repository, EntityRepository} from "typeorm";
import { File} from "../entities/AnxFile";

@EntityRepository(File)
class AnxFilesRepository extends Repository<File>{}
export {AnxFilesRepository};