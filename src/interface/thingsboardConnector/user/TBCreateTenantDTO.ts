import { CreateTenantRes } from './TBUserInterface';

export default class TBCreateTenantDTO implements CreateTenantRes {
  status: number;

  id: {
    entityType: string;
    id: string;
  };

  name: string;

  lastName: string;

  firstName: string;

  email: string;

  errorMessage?: any;

  constructor(data: any) {
    this.status = data.status;
    this.id = data.id;
    this.name = data.name;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.errorMessage = data.errorMessage;
  }
}
