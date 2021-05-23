export class Medicaux {
  private _allergie: string;
  private _diabete: string;
  private _hypertension: string;
  private _asthme: string;
  private _autres: string;
  private _none: string;

  get allergie(): string {
    return this._allergie;
  }

  set allergie(value: string) {
    this._allergie = value;
  }

  get diabete(): string {
    return this._diabete;
  }

  set diabete(value: string) {
    this._diabete = value;
  }

  get hypertension(): string {
    return this._hypertension;
  }

  set hypertension(value: string) {
    this._hypertension = value;
  }

  get asthme(): string {
    return this._asthme;
  }

  set asthme(value: string) {
    this._asthme = value;
  }

  get autres(): string {
    return this._autres;
  }

  set autres(value: string) {
    this._autres = value;
  }

  get none(): string {
    return this._none;
  }

  set none(value: string) {
    this._none = value;
  }
}
