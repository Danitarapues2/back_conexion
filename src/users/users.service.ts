import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(_arg0: number): Promise<Users> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_user: Users): Promise<Users> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(_arg0: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Users[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

}