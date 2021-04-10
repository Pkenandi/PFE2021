import { User } from '../User/user';

export class Patient extends User{
  public username: string;
  public groupeSang: string;
  public age: number;
  public dateNaiss: Date;

  // tslint:disable-next-line: max-line-length
  constructor(nom: string, prenom: string, ville: string, phone: string, email: string, password: string, cpassword: string, username: string, groupeSang: string, datenaiss: Date)
  {
    super(nom, prenom, ville, phone, email, password, cpassword);
    this.username = username;
    this.groupeSang = groupeSang;
    this.dateNaiss = datenaiss;
  }

  getUsername(): string
  {
    return this.username;
  }

  getGroupesang(): string
  {
    return this.groupeSang;
  }

  getDatenaiss(): Date
  {
    return this.dateNaiss;
  }
}
