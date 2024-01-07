import { Module } from '@nestjs/common';
import { Pagarme } from './infra/psp/pagarme/pagarme.service';
import { CreateChargeUseCase } from './app/use-cases/create-charge.use-case';
import { CreateChargeController } from './presentation/controllers/create-charge.controller';
import { ICreateCharge } from './domain/contracts/psp-service.interface';

@Module({
  providers: [
    Pagarme,
    {
      provide: CreateChargeUseCase,
      useFactory: (pspService: ICreateCharge) => {
        return new CreateChargeUseCase(pspService);
      },
      inject: [Pagarme],
    },
  ],
  controllers: [CreateChargeController],
})
export class CreditCardModule {}
