import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';

export class CreateUserPutDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 50, {
    message: 'La longitud del nombre debe ser de al menos 3 letras',
  })
  name: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail(
    {},
    {
      message: 'El correo electrónico debe ser una dirección de correo válida',
    },
  )
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @Length(6, 100, {
    message: 'La longitud de la contraseña debe ser de al menos 6 caracteres',
  })
  password: string;
}
