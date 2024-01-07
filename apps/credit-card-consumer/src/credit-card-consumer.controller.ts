import { Controller, Get } from '@nestjs/common';
import { CreditCardConsumerService } from './credit-card-consumer.service';

@Controller()
export class CreditCardConsumerController {
  constructor(private readonly creditCardConsumerService: CreditCardConsumerService) {}

  @Get()
  getHello(): string {
    return this.creditCardConsumerService.getHello();
  }
}
