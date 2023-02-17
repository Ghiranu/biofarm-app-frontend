import { Authentication } from "Authentication/types/classes";
import { AuthenticationDTO } from "Authentication/types/dtos";
import { CrudService } from "shared/services";
import { AUTH_SERVICE_PATH } from "shared/constants";
import { AuthenticationFactory } from "../factories/authentication.factory";

class AuthenticationService extends CrudService<Authentication> {
  protected factory: AuthenticationFactory;

  constructor() {
    super();
    this.factory = new AuthenticationFactory();
  }

  protected get path(): string {
    return AUTH_SERVICE_PATH;
  }

  login(resource: any, route: string) {
    return this.post(resource, route);
  }

  register(resource: any, route: string) {
    return this.post(resource, route);
  }

  refresh(route: string) {
    return this.get(route);
  }

  logout(route: string) {
    return this.get(route);
  }
}

export default new AuthenticationService();
