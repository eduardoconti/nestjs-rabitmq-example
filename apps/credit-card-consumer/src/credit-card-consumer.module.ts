import { Module } from '@nestjs/common';
import { CreateChargeOnPSPEventHandler } from './event-handler/create-charge-on-psp.event-handler';

@Module({
  imports: [],
  controllers: [CreateChargeOnPSPEventHandler],
  providers: [],
})
export class CreditCardConsumerModule {}
