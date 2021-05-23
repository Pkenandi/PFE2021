export class GynecoObstetricaux {
  private _nombreGrossesse: string;
  private _nombreEnfant: string;
  private _cesarienne: string;
  private _autres: string;
  private _none: string;

  get none(): string {
    return this._none;
  }

  set none(value: string) {
    this._none = value;
  }

  get nombreGrossesse(): string {
    return this._nombreGrossesse;
  }

  set nombreGrossesse(value: string) {
    this._nombreGrossesse = value;
  }

  get nombreEnfant(): string {
    return this._nombreEnfant;
  }

  set nombreEnfant(value: string) {
    this._nombreEnfant = value;
  }

  get cesarienne(): string {
    return this._cesarienne;
  }

  set cesarienne(value: string) {
    this._cesarienne = value;
  }

  get autres(): string {
    return this._autres;
  }

  set autres(value: string) {
    this._autres = value;
  }
}

