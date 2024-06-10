import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { CreateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<any> {
    try {
      const user = await this.usersService.create(createUserDto);
      return {
        message: 'Usuario creado correctamente',
        user: {
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Error al crear el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll(): Promise<Users[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    const user = await this.usersService.getUsersById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: Partial<Users>,
  ): Promise<Users> {
    return this.usersService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<string> {
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
