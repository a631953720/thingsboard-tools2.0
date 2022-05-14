import { CreateTenantAdminRes } from './TBUserInterface';

export default class TBCreateTenantAdminDTO implements CreateTenantAdminRes {
  status: number;

  id: {
    entityType: string;
    id: string;
  };

  name: string;

  email: string;

  errorMessage: any;

  constructor(data: any) {
    this.status = data.status;
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.errorMessage = data.errorMessage;
  }
}
