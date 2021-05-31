export class Horraire {
  id: number;
  jour: string;
  heure_debut: string;
  heure_fin: string;


  constructor(id: number, jour: string, heure_debut: string, heure_fin: string) {
    this.id = id;
    this.jour = jour;
    this.heure_debut = heure_debut;
    this.heure_fin = heure_fin;
  }
}
