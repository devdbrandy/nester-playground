import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@models/product.entity';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

export const repositoryMockFactory = jest.fn(() => ({}));

describe('Products Controller', () => {
  let controller: ProductsController;
  let productsService: ProductsService;
  let repositoryMock: MockType<Repository<Product>>;
  const productMock = new Product();
  productMock.id = 1;
  productMock.title = 'Product title';
  productMock.description = 'some description';
  productMock.price = 30.22;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
    repositoryMock = module.get(getRepositoryToken(Product));
  });

  describe('getProducts', () => {
    it('should return an array of products', async () => {
      const listOfProducts = [productMock];
      jest.spyOn(productsService, 'findAll').mockResolvedValue(listOfProducts);
      expect(await controller.getProducts()).toEqual({ products: listOfProducts });
    });
  });

  describe('getProduct', () => {
    it('should return a single product', async () => {
      jest.spyOn(productsService, 'findOne').mockResolvedValue(productMock);
      expect(await controller.getProduct(1)).toEqual({ product: productMock });
    });
  });

  describe('addProduct', () => {
    it('should create a new product and return the id', async () => {
      const productData = {
        title: 'Product title',
        description: 'product description',
        price: 10.50,
      };
      jest.spyOn(productsService, 'createProduct').mockResolvedValue(productMock);
      expect(await controller.addProduct(productData)).toEqual({ id: productMock.id });
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product', async () => {
      const productData = {
        title: 'Title update',
        description: 'product description',
        price: 10.50,
      };
      jest.spyOn(productsService, 'updateProduct').mockResolvedValue(productMock);
      expect(await controller.updateProduct(1, productData))
        .toEqual({ message: 'Product successfully updated.' });
    });
  });

  describe('destroyProduct', () => {
    it('should delete an existing product', async () => {
      jest.spyOn(productsService, 'destroyProduct')
        .mockResolvedValue({ affected: 1, raw: true });
      expect(await controller.destroyProduct(1))
        .toEqual({ message: 'Product successfully removed.' });
    });
  });
});
