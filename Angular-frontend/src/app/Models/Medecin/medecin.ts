import { User } from '../User/user';


export class Medecin extends User{
  public cin: string;
  public specialite: string;

  // tslint:disable-next-line: max-line-length
  constructor(nom: string, prenom: string, ville: string, phone: string, email: string, password: string, Cpassword: string, cin: string, specialite: string)
  {
    super(nom, prenom, ville, phone, email, password, Cpassword);
    this.cin = cin;
    this.specialite = specialite;
  }

  public getCin(): string
  {
    return this.cin;
  }

  public getSpecialite(): string
  {
    return this.specialite;
  }

}


