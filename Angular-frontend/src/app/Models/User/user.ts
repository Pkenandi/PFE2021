export class User {
  public Id: number;
  public nom: string;
  public prenom: string;
  public ville: string;
  public email: string;
  public phone: string;
  public password: string;
  public cpassword: string;

  constructor(nom: string, prenom: string, ville: string, email: string, phone: string, password: string, cpassword: string)
  {
    this.nom = nom;
    this.prenom = prenom;
    this.phone = phone;
    this.ville = ville;
    this.email = email;
    this.password = password;
    this.cpassword = cpassword;
  }

  public getNom(): string
  {
    return this.nom;
  }

  getPrenom(): string
  {
    return this.prenom;
  }

  getVille(): string
  {
    return this.ville;
  }

  getPhone(): string
  {
    return this.phone;
  }

  getEmail(): string
  {
    return this.email;
  }
  getPassword(): string
  {
    return this.password;
  }
  getCpassword(): string
  {
    return this.cpassword;
  }

}
