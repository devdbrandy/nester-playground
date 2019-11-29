import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@models/product.entity';

const productMock = new Product();
productMock.id = 1;
productMock.title = 'Product title';
productMock.description = 'some description';
productMock.price = 30.22;

export const repositoryMockFactory = jest.fn(() => ({
  find: jest.fn(() => [productMock]),
  findOne: jest.fn(() => productMock),
  save: jest.fn(() => productMock),
  delete: jest.fn(() => ({ affected: 1, raw: true })),
}));

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get(getRepositoryToken(Product));
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const listOfProducts = [productMock];
      expect(await service.findAll()).toEqual(listOfProducts);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      expect(await service.findOne(1)).toEqual(productMock);
      expect(productRepository.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('createProduct', () => {
    it('should create and return a new product', async () => {
      const productData = {
        title: 'Product title',
        description: 'product description',
        price: 10.50,
      };

      expect(await service.createProduct(productData)).toEqual(productMock);
      expect(productRepository.save).toHaveBeenCalledWith(productData);
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product', async () => {
      const productData = {
        title: 'Product title',
        description: 'product description',
        price: 10.50,
      };

      expect(await service.updateProduct(1, productData)).toEqual(productMock);
      expect(productRepository.save).toHaveBeenCalledWith({ ...productData, id: 1 });
    });
  });

  describe('destroyProduct', () => {
    it('should delete an existing product', async () => {
      const deletedResult = { affected: 1, raw: true };

      expect(await service.destroyProduct(1)).toEqual(deletedResult);
      expect(productRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
