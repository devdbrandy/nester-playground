// Where `Dto` stands for Data Transfer Object, usually this is the request body
// And `Ro` is Response Object

export interface CreateProductDto {
  name: string;
}

export interface UpdateProductDto {
  title: string;
  description: string;
  price: number;
}

// export interface ProductRo {
//   id: number;
//   name: string;
// }
