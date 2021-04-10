
export class DossierMedical {
  public id: number;
  public numero: string;
  public antecedent: string;

  constructor(numero: string, ant: string)
  {
    this.antecedent = ant;
    this.numero = numero;
  }
}
