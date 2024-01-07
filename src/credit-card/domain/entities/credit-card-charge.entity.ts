export type CreditCardChargeEntityProps = {
  id: string;
  itens: { value: number; quantity: number; description: string }[];
  customer: { name: string };
  cardToken: string;
};

export class CreditCardChargeEntity {
  constructor({
    id,
    itens,
    customer,
    cardToken,
  }: Omit<CreditCardChargeEntityProps, 'id'> & { id?: string | undefined }) {
    this._id = id;
    this._itens = itens;
    this._customer = customer;
    this._cardToken = cardToken;
  }

  get id() {
    return this._id;
  }

  get itens() {
    return this._itens;
  }

  get customer() {
    return this._customer;
  }

  get cardToken() {
    return this._cardToken;
  }

  private _id!: string | undefined;
  private _itens!: { value: number; quantity: number; description: string }[];
  private _customer!: { name: string };
  private _cardToken!: string;

  static newCharge(
    props: Omit<CreditCardChargeEntityProps, 'id'>,
  ): CreditCardChargeEntity {
    return new CreditCardChargeEntity(props);
  }
}
