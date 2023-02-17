import { CrudService } from "shared/services";
import { PRODUCTS_SERVICE_PATH } from "shared/constants/utils";
import { Order } from "../types";
import { OrderFactory } from "../factories";

class OrderService extends CrudService<Order> {
  protected factory: OrderFactory;

  constructor() {
    super();
    this.factory = new OrderFactory();
  }

  protected get path(): string {
    return PRODUCTS_SERVICE_PATH;
  }

  getOrders(route: string) {
    return this.getAll(route);
  }
}

export default new OrderService();
