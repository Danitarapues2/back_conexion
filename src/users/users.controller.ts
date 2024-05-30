import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';

@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: { name: string; email: string; password: string },
  ): Promise<string> {
    const user = await this.usersService.create(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );

    return `
    Nombre: ${user.name}, 
    Email: ${user.email}, 
    Contraseña: ${user.password}`;
  }

  @Get()
  findAll(): Promise<Users[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number): string {
    if (id <= 49) {
      return `El id: ${id} es menor que 50`;
    } else if (id >= 50 && id <= 99) {
      return `El id: ${id} es igual o mayor que 50 pero menor a 100 `;
    } else {
      return `El Id: ${id} no existe`;
    }
  }

}
