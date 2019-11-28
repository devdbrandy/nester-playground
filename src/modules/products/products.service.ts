import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '@models/product.entity';
import { CreateProductDto } from './interfaces/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  createProduct(productData: CreateProductDto): Promise<Product> {
    return this.productRepository.save(productData);
  }

  updateProduct(id: number, productData): Promise<Product> {
    return this.productRepository.save({ ...productData, id: +id });
  }

  destroyProduct(id: number) {
    return this.productRepository.delete(id);
  }

}
