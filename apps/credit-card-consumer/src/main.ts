import { NestFactory } from '@nestjs/core';
import { CreditCardConsumerModule } from './credit-card-consumer.module';
import { RmqOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(CreditCardConsumerModule);
  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://rabbitmq:5672`],
      queue: 'create_charge_psp',
      prefetchCount: 1,
      persistent: true,
      noAck: false,
      queueOptions: {
        durable: true,
      },
      socketOptions: {
        heartbeatIntervalInSeconds: 60,
        reconnectTimeInSeconds: 5,
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
