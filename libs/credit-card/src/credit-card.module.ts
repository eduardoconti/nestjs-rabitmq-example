import { Module } from '@nestjs/common';
import { Pagarme } from './infra/psp/pagarme/pagarme.service';
import { CreateChargeUseCase } from './app/use-cases/create-charge.use-case';
import {
  CreateChargePublisher,
  IPublisherCreateCharge,
} from './infra/rmq/publisher/create-charge.publisher';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

const provideCreateChargeUseCase = {
  provide: CreateChargeUseCase,
  useFactory: (publisher: IPublisherCreateCharge) => {
    return new CreateChargeUseCase(publisher);
  },
  inject: [CreateChargePublisher],
};

const provideChargePublisher = {
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
};

@Module({
  providers: [
    Pagarme,
    CreateChargePublisher,
    provideChargePublisher,
    provideCreateChargeUseCase,
  ],
  exports: [
    Pagarme,
    CreateChargePublisher,
    provideChargePublisher,
    provideCreateChargeUseCase,
  ],
})
export class CreditCardModule {}
