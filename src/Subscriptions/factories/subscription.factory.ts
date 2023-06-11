import { BaseFactory } from "shared/factories/base/base.factory";
import { Subscription } from "../types";

export class SubscriptionFactory extends BaseFactory<Subscription> {
  fromDTO(dto: Subscription) {
    const model = new Subscription();
    model.setProperties(dto);
    return model;
  }

  toDTO(model: Subscription) {
    return model;
  }
}
