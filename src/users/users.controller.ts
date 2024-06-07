import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
  async findOne(@Param('id') id: number): Promise<Users> {
    return this.usersService.getUsersById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: Partial<Users>,
  ): Promise<Users> {
    return this.usersService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<string> {
    try {
      await this.usersService.deleteUser(id);
      return `User with ID ${id} has been deleted.`;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          `Error deleting user with ID ${id}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
