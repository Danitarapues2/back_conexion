import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class CreateUserPatchDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 50, {
    message: 'La longitud del nombre debe ser de al menos 3 letras',
  })
  @IsOptional()
  name: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'El correo electrónico debe ser una dirección de correo válida',
    },
  )
  email: string;

  @IsString()
  @Length(6, 100, {
    message: 'La longitud de la contraseña debe ser de al menos 6 caracteres',
  })
  @IsOptional()
  @Length(6, 100, {
    message: 'La longitud de la contraseña debe ser de al menos 6 caracteres',
  })
  password: string;
}
