import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { User } from './interface/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async create(name: string, email: string, password: string): Promise<User> {
    const user = this.usersRepository.create({ name, email, password });
    return this.usersRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    const usersFound = await this.usersRepository.find({
      order: { id: 'DESC' },
    });
    return usersFound;
  }

  async getUsersById(id: number): Promise<User> {
    const userFound = await this.usersRepository.findOne({ where: { id } });
    return userFound;
  }

  async updateById(id: number, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.getUsersById(id); // Reuse the getUsersById method to check if the user exists
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.delete(id);
  }
}
