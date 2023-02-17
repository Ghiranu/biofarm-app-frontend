import { BaseFactory } from "shared/factories/base/base.factory";
import { ShoppingCart } from "../types/classes";

export class ShoppingCartFactory extends BaseFactory<ShoppingCart> {
  fromDTO(dto: ShoppingCart) {
    const model = new ShoppingCart();
    model.setProperties(dto);
    return model;
  }

  toDTO(model: ShoppingCart) {
    return model;
  }
}
