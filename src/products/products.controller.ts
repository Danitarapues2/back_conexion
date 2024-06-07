import { Controller, Get, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('query')
  rutaQuery(@Query() query) {
    return `El dato query.x ha recibido el valor ${query.x}`;
  }

  @Get('cars')
  carsQuery(@Query('count') carCount: number) {
    return ` La cuenta cart Count es: ${carCount}`;
  }
}
