import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { User } from './interface/users.interface';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    const user = this.usersRepository.create({ name, email, password });
    return this.usersRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find({ order: { id: 'DESC' } });
  }

  async getUsersById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateById(id: number, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.getUsersById(id); // Reuse the getUsersById method to check if the user exists
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUsersById(id); // Reuse the getUsersById method to check if the user exists
    await this.usersRepository.delete(user);
  }
}
