import { ProductsDTO } from "./products.dto";

export interface ShoppingCartDTO {
  _id: string;
  product: {
    _id: string;
    title: string;
    inStock: boolean;
    image: string;
    price: number;
  };
  quantity: number;
  url?: string;
}
