import { Pipe, PipeTransform } from '@angular/core';
import {Medecin} from "../Models/Medecin/medecin";

@Pipe({
  name: 'searcheFilter'
})
export class SearcheFilterPipe implements PipeTransform {

  transform(medecins: Medecin[], key: string): Medecin[] {
    if(!medecins || !key) {
      return medecins;
    }

    return medecins.filter(medecin =>
      medecin.specialite.toLowerCase().includes(key.toLowerCase()) ||
      medecin.nom.toLowerCase().includes(key.toLowerCase()) ||
      medecin.prenom.toLowerCase().includes(key.toLowerCase()) ||
      medecin.ville.toLowerCase().includes(key.toLowerCase())
    );
  }

}
