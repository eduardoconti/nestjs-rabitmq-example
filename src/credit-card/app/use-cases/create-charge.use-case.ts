import {
  CreateChargeInputProps,
  CreateChargeOutputProps,
} from 'src/credit-card/domain/contracts/psp-service.interface';
import { CreditCardChargeEntity } from 'src/credit-card/domain/entities/credit-card-charge.entity';
import { ICreateChargeUseCase } from 'src/credit-card/domain/use-cases/create-charge.use-case';
import { IPublisherCreateCharge } from 'src/credit-card/infra/rmq/publisher/create-charge.publisher';

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
