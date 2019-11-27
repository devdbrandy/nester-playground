import { IsString, IsNumber } from 'class-validator';

// Where `Dto` stands for Data Transfer Object, usually this is the request body
// And `Ro` is Response Object

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
