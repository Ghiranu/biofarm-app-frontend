import { ProductsDTO, ShoppingCartDTO } from "../dtos";

export class ShoppingCart {
  _id: string;
  quantity: number;
  product: {
    _id: string;
    title: string;
    inStock: boolean;
    image: string;
    price: number;
  };
  url?: string;

  setProperties(dto: ShoppingCartDTO) {
    this.setShoppingCartInfo(dto);
  }

  private setShoppingCartInfo(dto: ShoppingCartDTO) {
    this._id = dto._id;
    this.quantity = dto.quantity;
    this.product = dto.product;
    this.url = dto.url;
  }
}
