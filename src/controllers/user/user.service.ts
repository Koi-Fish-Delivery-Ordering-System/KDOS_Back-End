import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserMySqlEntity } from "src/database";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserMySqlEntity)
        private readonly userRepository: Repository<UserMySqlEntity>,
    ) { }
}