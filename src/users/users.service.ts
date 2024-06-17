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
    const list = await this.usersRepository.find();
    if (list.length == 0) {
      throw new NotFoundException('La lista esta vacia');
    }
    return list;
  }

  async getUsersById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }
    return user;
  }

  async updateById(id: number, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.getUsersById(id); // Reutilice el método getUsersById para comprobar si el usuario existe
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUsersById(id); // Reutilice el método getUsersById para comprobar si el usuario existe
    await this.usersRepository.delete(user);
  }

  async partialUpdate(
    id: number,
    partialUserDto: Partial<CreateUserDto>,
  ): Promise<User> {
    const user = await this.getUsersById(id);
    Object.assign(user, partialUserDto);
    return this.usersRepository.save(user);
  }
}
