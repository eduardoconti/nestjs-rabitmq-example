import { Injectable } from '@nestjs/common';

@Injectable()
export class CreditCardConsumerService {
  getHello(): string {
    return 'Hello World!';
  }
}
