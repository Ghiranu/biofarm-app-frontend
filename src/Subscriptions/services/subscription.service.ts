import { CrudService } from "core";
import { PRODUCTS_SERVICE_PATH } from "shared/constants/utils";

import { SubscriptionFactory } from "../factories";
import { Subscription } from "../types/classes";

class SubscriptionService extends CrudService<Subscription> {
  protected factory: SubscriptionFactory;

  constructor() {
    super();
    this.factory = new SubscriptionFactory();
  }

  protected get path(): string {
    return PRODUCTS_SERVICE_PATH;
  }

  getSubscriptions(route: string) {
    return this.getAll(route);
  }

  createSubscriptions(resource: any, route: string) {
    return this.post(resource, route);
  }

  cancelSubscription(route: string) {
    return this.delete(route);
  }
}

export default new SubscriptionService();
