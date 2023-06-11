export class Authentication {
  username?: string | undefined;
  accessToken?: string | undefined;
  password?: string | undefined;
  roles?: string;

  setProperties(dto: any) {
    this.setAuthenticationInfo(dto);
  }

  private setAuthenticationInfo(dto: any) {
    this.username = dto.username;
    this.accessToken = dto.accessToken;
    this.password = dto.password;
    this.roles = dto.roles;
  }
}
