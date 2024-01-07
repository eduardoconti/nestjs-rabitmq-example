import {
  CreateChargeInputProps,
  CreateChargeOutputProps,
  ICreateCharge,
} from 'src/credit-card/domain/contracts/psp-service.interface';
import { CreditCardChargeEntity } from 'src/credit-card/domain/entities/credit-card-charge.entity';
import { ICreateChargeUseCase } from 'src/credit-card/domain/use-cases/create-charge.use-case';

export class CreateChargeUseCase implements ICreateChargeUseCase {
  constructor(private readonly pspService: ICreateCharge) {}

  async execute(
    props: CreateChargeInputProps,
  ): Promise<CreateChargeOutputProps> {
    const entity = CreditCardChargeEntity.newCharge(props);
    console.log(entity);
    await new Promise((resolve) => setTimeout(resolve, 100)); //simulate database access
    return await this.pspService.createCharge(props);
  }
}
