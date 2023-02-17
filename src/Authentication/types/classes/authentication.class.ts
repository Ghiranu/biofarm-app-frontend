export class Authentication {
  username?: string | undefined;
  accessToken?: string | undefined;
  password?: string | undefined;

  setProperties(dto: any) {
    this.setAuthenticationInfo(dto);
  }

  private setAuthenticationInfo(dto: any) {
    this.username = dto.email;
    this.accessToken = dto.accessToken;
    this.password = dto.password;
  }
}
