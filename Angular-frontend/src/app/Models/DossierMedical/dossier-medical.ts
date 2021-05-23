import {Medicaux} from "../antecedent/medical/medicaux";
import {Chirurgicaux} from "../antecedent/chirurgical/chirurgicaux";
import {GynecoObstetricaux} from "../antecedent/gyneco-obstetrical/gyneco-obstetricaux";

export class DossierMedical {
  public id: number;
  public numero: string;
  public antMed: Medicaux;
  public antCh: Chirurgicaux;
  public antGyn: GynecoObstetricaux;
  public prescription: string;
  public observation: string;

}
