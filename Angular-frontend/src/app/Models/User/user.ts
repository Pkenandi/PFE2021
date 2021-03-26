export class User {
  protected Id: number;
  protected nom: string;
  protected prenom: string;
  protected Ville: string;
  protected email: string;
  protected phone: string;
  protected password: string;
  protected cpassword: string;

  constructor(nom: string, prenom: string, ville: string, email: string, phone: string, password: string, cpassword: string)
  {
    this.nom = nom;
    this.prenom = prenom;
    this.phone = phone;
    this.Ville = ville;
    this.email = email;
    this.password = password;
    this.cpassword = cpassword;
  }

  getNom(): string
  {
    return this.nom;
  }

  getPrenom(): string
  {
    return this.prenom;
  }

  getVille(): string
  {
    return this.Ville;
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
