import {
  CreateChargeInputProps,
  CreateChargeOutputProps,
} from '../../domain/contracts/psp-service.interface';
import { CreditCardChargeEntity } from '../../domain/entities/credit-card-charge.entity';
import { ICreateChargeUseCase } from '../../domain/use-cases/create-charge.use-case';
import { IPublisherCreateCharge } from '../../infra/rmq/publisher/create-charge.publisher';

export class CreateChargeUseCase implements ICreateChargeUseCase {
  constructor(private readonly publisher: IPublisherCreateCharge) {}

  async execute(
    props: CreateChargeInputProps,
  ): Promise<Omit<CreateChargeOutputProps, 'pspId' | 'value'>> {
    const entity = CreditCardChargeEntity.newCharge(props);
    console.log(entity);
    await new Promise((resolve) => setTimeout(resolve, 100)); //simulate database access
    await this.publisher.publish(props);
    return { ...props, status: 'PENDING' };
  }
}
