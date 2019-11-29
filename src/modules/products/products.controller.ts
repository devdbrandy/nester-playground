import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './interfaces/create-product.dto';

@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body() productData: CreateProductDto,
  ) {
    const product = await this.productsService.createProduct(productData);
    return { id: product.id };
  }

  @Get()
  async getProducts() {
    const products = await this.productsService.findAll();
    return { products };
  }

  @Get(':id')
  async getProduct(@Param('id') id: number) {
    const product = await this.productsService.findOne(id);
    return { product };
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() productData: CreateProductDto,
  ) {
    await this.productsService.updateProduct(id, productData);
    return { message: 'Product successfully updated.' };
  }

  @Delete(':id')
  destroyProduct(@Param('id') id: number) {
    this.productsService.destroyProduct(id);
    return { message: 'Product successfully removed.' };
  }
}
