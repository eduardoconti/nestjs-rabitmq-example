import { Module } from '@nestjs/common';
import { CreateChargeController } from './presentation/controllers/create-charge.controller';
import { CreditCardModule } from '@libs/credit-card/credit-card.module';

@Module({
  imports: [CreditCardModule],
  controllers: [CreateChargeController],
})
export class CreditCardApiModule {}
