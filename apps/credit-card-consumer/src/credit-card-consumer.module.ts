import { Module } from '@nestjs/common';
import { CreditCardConsumerController } from './credit-card-consumer.controller';
import { CreditCardConsumerService } from './credit-card-consumer.service';

@Module({
  imports: [],
  controllers: [CreditCardConsumerController],
  providers: [CreditCardConsumerService],
})
export class CreditCardConsumerModule {}
