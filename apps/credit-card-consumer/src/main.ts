import { NestFactory } from '@nestjs/core';
import { CreditCardConsumerModule } from './credit-card-consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(CreditCardConsumerModule);
  await app.listen(3000);
}
bootstrap();
