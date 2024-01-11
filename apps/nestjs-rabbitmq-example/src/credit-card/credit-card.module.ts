import { Module } from '@nestjs/common';
import { CreateChargeController } from './presentation/controllers/create-charge.controller';
import { CreditCardModule } from '@libs/credit-card/credit-card.module';
import { IdempotencyModule } from '../idempotency/idempotency.module';

@Module({
  imports: [CreditCardModule, IdempotencyModule],
  controllers: [CreateChargeController],
})
export class CreditCardApiModule {}
