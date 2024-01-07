import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardConsumerController } from './credit-card-consumer.controller';
import { CreditCardConsumerService } from './credit-card-consumer.service';

describe('CreditCardConsumerController', () => {
  let creditCardConsumerController: CreditCardConsumerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CreditCardConsumerController],
      providers: [CreditCardConsumerService],
    }).compile();

    creditCardConsumerController = app.get<CreditCardConsumerController>(CreditCardConsumerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(creditCardConsumerController.getHello()).toBe('Hello World!');
    });
  });
});
