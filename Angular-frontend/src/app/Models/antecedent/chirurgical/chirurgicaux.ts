export class Chirurgicaux {
  private _operationAnt: string;
  private _traumatismeAnt: string;
  private _autres: string;
  private _none: string;

  get operationAnt(): string {
    return this._operationAnt;
  }

  set operationAnt(value: string) {
    this._operationAnt = value;
  }

  get traumatismeAnt(): string {
    return this._traumatismeAnt;
  }

  set traumatismeAnt(value: string) {
    this._traumatismeAnt = value;
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
