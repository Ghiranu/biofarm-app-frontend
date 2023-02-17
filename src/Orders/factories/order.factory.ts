import { BaseFactory } from "shared/factories/base/base.factory";
import { Order } from "../types";

export class OrderFactory extends BaseFactory<Order> {
  fromDTO(dto: Order) {
    const model = new Order();
    model.setProperties(dto);
    return model;
  }

  toDTO(model: Order) {
    return model;
  }
}
