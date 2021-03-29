import { Patient } from "../Patient/patient";

export class DossierMedical {
  public id: number;
  public numero: number;
  public antecedent: string;
  public patient: Patient;

  constructor(numero: number, ant: string)
  {
    this.antecedent = ant;
    this.numero = numero;
  }
}
