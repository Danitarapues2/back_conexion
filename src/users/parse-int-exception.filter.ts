// import {
//   ArgumentsHost,
//   BadRequestException,
//   Catch,
//   ExceptionFilter,
// } from '@nestjs/common';
// import { ValidationError } from 'class-validator';

// @Catch(BadRequestException)
// export class ParseIntExceptionFilter implements ExceptionFilter {
//   catch(exception: BadRequestException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();
//     const status = exception.getStatus();

//     // Verifica si la excepción se originó en la validación de CreateUserDto
//     const validationErrors = exception.getResponse()['message'];
//     if (
//       Array.isArray(validationErrors) &&
//       validationErrors.every(isValidationError)
//     ) {
//       const errors = validationErrors.flatMap((error: ValidationError) =>
//         Object.values(error.constraints),
//       );
//       return response.status(status).json({
//         statusCode: status,
//         message: errors,
//       });
//     }

//     // Si no es un error de validación, maneja el error de ParseIntPipe
//     const errorMessage = 'El ID debe ser un número entero.';
//     response.status(status).json({
//       statusCode: status,
//       message: errorMessage,
//     });
//   }
// }

// function isValidationError(error: any): error is ValidationError {
//   return typeof error.constraints === 'object' && error.constraints !== null;
// }
