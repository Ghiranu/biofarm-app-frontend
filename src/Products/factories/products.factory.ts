import { BaseFactory } from "shared/factories/base/base.factory";
import { Products } from "../types/classes";

export class ProductsFactory extends BaseFactory<Products> {
  fromDTO(dto: Products) {
    const model = new Products();
    model.setProperties(dto);
    return model;
  }

  toDTO(model: Products) {
    return model;
  }
}
