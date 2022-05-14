interface GetTenantTokenRes {
  status: number;
  systemAdminEmail: string;
  tenantAdminName: string;
  tenantEmail: string;
  token: string;
  refreshToken: string;
  errorMessage: any;
}

export default class AutoLoginToGetTenantTokenDTO implements GetTenantTokenRes {
  status: number;

  systemAdminEmail: string;

  tenantAdminName: string;

  tenantEmail: string;

  token: string;

  refreshToken: string;

  errorMessage: any;

  constructor(data: any) {
    this.status = data.status;
    this.systemAdminEmail = data.systemAdminEmail;
    this.tenantAdminName = data.tenantAdminName;
    this.tenantEmail = data.tenantEmail;
    this.token = data.token;
    this.refreshToken = data.refreshToken;
    this.errorMessage = data.errorMessage;
  }
}
