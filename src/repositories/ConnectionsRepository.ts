import {Repository, EntityRepository} from "typeorm";
import { connection } from "../entities/connection";

@EntityRepository(connection)
class ConnectionsRepository extends Repository<connection>{}
export{ConnectionsRepository}