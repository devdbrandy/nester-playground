import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { Product } from '@models/product.model';
import { ProductsService } from '../services/products.service';
import { UpdateProductDto } from '../products.dto';

@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): { id: string } {
    const productId = this.productsService.addProduct(title, description, price);
    return { id: productId };
  }

  @Get()
  getProducts(): { products: Product[] } {
    const products = this.productsService.getProducts();
    return { products };
  }

  @Get(':id')
  getProduct(@Param('id') id: string): { product: Product } {
    const product = this.productsService.getProduct(id);
    return { product };
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ): { message: string } {
    this.productsService.updateProduct(id, body);
    return { message: 'Product successfully updated.' };
  }

  @Delete(':id')
  destroyProduct(@Param('id') id: string): { message: string } {
    this.productsService.destroyProduct(id);
    return { message: 'Product successfully removed' };
  }
}
