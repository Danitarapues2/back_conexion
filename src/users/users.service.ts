import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { User } from './interface/users.interface';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}


  async getAllUsers(): Promise<User[]> {
    const usersFound = await this.usersRepository.find();
    return usersFound;
  }
}