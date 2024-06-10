import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 50) // Ajusta la longitud según tus necesidades
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100) // Longitud mínima de 6 caracteres para la contraseña
  password: string;
}
