import { Module } from '@nestjs/common';
import { CreateChargeOnPSPEventHandler } from './presentation/event-handler/create-charge-on-psp.event-handler';
import { CreditCardModule } from '@libs/credit-card/credit-card.module';

@Module({
  imports: [CreditCardModule],
  controllers: [CreateChargeOnPSPEventHandler],
  providers: [],
})
export class CreditCardConsumerModule {}
