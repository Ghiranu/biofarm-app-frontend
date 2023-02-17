import { ProductsDTO } from "../dtos";

export class Products {
  _id: string;
  title: string;
  price: string;
  inStock: boolean;
  image: FileList;

  setProperties(dto: ProductsDTO) {
    this.setProductsInfo(dto);
  }

  private setProductsInfo(dto: ProductsDTO) {
    this._id = dto._id;
    this.title = dto.title;
    this.price = dto.price;
    this.inStock = dto.inStock;
    this.image = dto.image;
  }
}
