import { Module } from '@nestjs/common';
import { Pagarme } from './infra/psp/pagarme/pagarme.service';
import { CreateChargeUseCase } from './app/use-cases/create-charge.use-case';
import { CreateChargeController } from './presentation/controllers/create-charge.controller';
import {
  CreateChargePublisher,
  IPublisherCreateCharge,
} from './infra/rmq/publisher/create-charge.publisher';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Module({
  providers: [
    Pagarme,
    {
      provide: CreateChargeUseCase,
      useFactory: (publisher: IPublisherCreateCharge) => {
        return new CreateChargeUseCase(publisher);
      },
      inject: [CreateChargePublisher],
    },
    CreateChargePublisher,
    {
      provide: 'create_charge_publisher',
      useFactory: (): ClientProxy => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://rabbitmq:5672`],
            queue: 'create_charge_psp',
            prefetchCount: 1,
            persistent: true,
            noAck: true,
            queueOptions: {
              durable: true,
            },
            socketOptions: {
              heartbeatIntervalInSeconds: 60,
              reconnectTimeInSeconds: 5,
            },
          },
        });
      },
    },
    CreateChargePublisher,
    {
      provide: 'create_charge_publisher',
      useFactory: (): ClientProxy => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://rabbitmq:5672`],
            queue: 'create_charge_psp',
            prefetchCount: 1,
            persistent: true,
            noAck: true,
            queueOptions: {
              durable: true,
            },
            socketOptions: {
              heartbeatIntervalInSeconds: 60,
              reconnectTimeInSeconds: 5,
            },
          },
        });
      },
    },
  ],
  controllers: [CreateChargeController],
})
export class CreditCardModule {}
