import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entity/users.entity';
import { CreateUserDto } from './dto/users.dto';
import { CreateUserPatchDto } from './dto/users.dto.patch';
import { CreateUserPutDto } from './dto/users.dto.put';

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
          password: user.password,
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
  async findAll(): Promise<Users[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          new BadRequestException(
            'El ID proporcionado no es un número entero válido',
          ),
      }),
    )
    id: number,
  ): Promise<Users> {
    return await this.usersService.getUsersById(id);
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          new BadRequestException(
            'El ID proporcionado no es un número entero válido',
          ),
      }),
    )
    id: number,

    @Body(ValidationPipe) createUserPutDto: CreateUserPutDto,
  ): Promise<Users> {
    try {
      return this.usersService.updateById(id, createUserPutDto);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async partialUpdate(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        exceptionFactory: () =>
          new BadRequestException(
            'El ID proporcionado no es un número entero válido',
          ),
      }),
    )
    id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserPatchDto: CreateUserPatchDto,
  ): Promise<Users> {
    try {
      return await this.usersService.partialUpdate(id, createUserPatchDto);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar parcialmente el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: () =>
          new BadRequestException(
            'El ID proporcionado no es un númeroooo entero válido',
          ),
      }),
    )
    id: number,
  ): Promise<string> {
    try {
      await this.usersService.deleteUser(id);
      return `Usuario con id: ${id} a sido eliminado`;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          `Error en eliminar usuario con el id: ${id}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
