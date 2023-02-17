import { PRODUCTS_SERVICE_PATH } from "shared/constants/utils";
import { CrudService } from "core";
import { ShoppingCartFactory } from "../factories";
import { ShoppingCart } from "../types/classes";

export class ShoppingCartService extends CrudService<ShoppingCart> {
  protected factory: ShoppingCartFactory;

  constructor() {
    super();
    this.factory = new ShoppingCartFactory();
  }

  protected get path(): string {
    return PRODUCTS_SERVICE_PATH;
  }

  getCartProducts(route: string) {
    return this.getAll(route);
  }

  proceedCheckout(resource: any, route: string) {
    return this.post(resource, route);
  }
}

export default new ShoppingCartService();
