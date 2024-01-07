import {
  CreateChargeInputProps,
  CreateChargeOutputProps,
  ICreateCharge,
} from '../../../domain/contracts/psp-service.interface';

export class Pagarme implements ICreateCharge {
  async createCharge({
    itens,
    customer,
  }: CreateChargeInputProps): Promise<CreateChargeOutputProps> {
    await new Promise((resolve) => setTimeout(resolve, 1000)); //simulate external request
    return {
      pspId: 'fakeUUID',
      status: 'PENDING',
      value: itens.reduce((acc, cur) => (acc = cur.value * cur.quantity), 0),
      itens,
      customer,
    };
  }
}
