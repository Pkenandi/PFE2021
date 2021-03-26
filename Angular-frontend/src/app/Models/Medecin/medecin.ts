import { User } from '../User/user';


export class Medecin extends User{
  private cin: string;
  private specialite: string;

  // tslint:disable-next-line: max-line-length
  constructor(nom: string, prenom: string, ville: string, phone: string, email: string, password: string, Cpassword: string, cin: string, specialite: string)
  {
    super(nom, prenom, ville, phone, email, password, Cpassword);
    this.cin = cin;
    this.specialite = specialite;
  }

  getCin(): string
{
  return this.cin;
}

getSpecialite(): string
{
  return this.specialite;
}

}


