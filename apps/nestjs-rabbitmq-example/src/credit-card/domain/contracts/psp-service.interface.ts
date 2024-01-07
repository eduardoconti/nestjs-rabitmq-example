export type CreateChargeInputProps = {
  itens: { value: number; quantity: number; description: string }[];
  customer: { name: string };
  cardToken: string;
};

export type CreateChargeOutputProps = {
  pspId: string;
  itens: { value: number; quantity: number; description: string }[];
  customer: { name: string };
  status: 'PENDING';
  value: number;
};

export interface ICreateCharge {
  createCharge(props: CreateChargeInputProps): Promise<CreateChargeOutputProps>;
}
