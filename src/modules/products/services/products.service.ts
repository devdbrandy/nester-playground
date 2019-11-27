import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import * as shortID from 'shortid';

import { Product } from '../../../database/models/product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  addProduct(title: string, description: string, price: number): string {
    const id = shortID.generate();
    const product = new Product(id, title, description, price);
    this.products.push(product);
    return id;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(id: string): Product {
    const [product] = this.findProduct(id);
    return { ...product };
  }

  updateProduct(id: string, productData) {
    const [product, index] = this.findProduct(id);
    this.products[index] = {
      ...product,
      ... productData,
    };
  }

  destroyProduct(id: string) {
    const [_, index] = this.findProduct(id);
    this.products.splice(index, 1);
    return true;
  }

  findProduct(id: string): [Product, number] {
    const index = this.products.findIndex(item => item.id === id);
    const product = this.products[index];
    if (!product) {
      throw new HttpException('Could not find product.', HttpStatus.NOT_FOUND);
    }

    return [product, index];
  }
}
