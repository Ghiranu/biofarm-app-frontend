import { PRODUCTS_SERVICE_PATH } from "shared/constants/utils";
import { CrudService } from "core";
import { ProductsFactory } from "../factories";
import { Products } from "../types/classes";

export class ProductsService extends CrudService<Products> {
  protected factory: ProductsFactory;

  constructor() {
    super();
    this.factory = new ProductsFactory();
  }

  protected get path(): string {
    return PRODUCTS_SERVICE_PATH;
  }

  addProduct(resource: any, route: string) {
    return this.post(resource, route);
  }

  getProducts(route: string) {
    return this.getAll(route);
  }

  addCartProduct(resource: any, route: string) {
    return this.post(resource, route);
  }

  subtractProductQuantity(resource: any, route: string) {
    return this.post(resource, route);
  }

  getCartProducts(route: string) {
    return this.getAll(route);
  }

  editProduct(resource: any, route: string) {
    return this.put(resource, route);
  }

  deleteProduct(route: string) {
    return this.delete(route);
  }
}

export default new ProductsService();
