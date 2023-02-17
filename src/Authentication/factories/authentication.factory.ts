import { BaseFactory } from "shared/factories";
import { Authentication } from "Authentication/types/classes";

export class AuthenticationFactory extends BaseFactory<Authentication> {
  fromDTO(dto: Authentication) {
    const model = new Authentication();
    model.setProperties(dto);
    return model;
  }

  toDTO(model: Authentication) {
    return model;
  }
}
