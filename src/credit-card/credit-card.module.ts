import { Module } from '@nestjs/common';
import { Pagarme } from './infra/psp/pagarme/pagarme.service';
import { CreateChargeUseCase } from './app/use-cases/create-charge.use-case';
import { CreateChargeController } from './presentation/controllers/create-charge.controller';
import { CreateChargeOnPSPEventHandler } from './presentation/event-handler/create-charge-on-psp.event-handler';
import { CreateChargePublisher } from './infra/rmq/publisher/create-charge.publisher';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ICreateCharge } from './domain/contracts/psp-service.interface';

@Module({
  providers: [
    Pagarme,
    {
      provide: CreateChargeUseCase,
      useFactory: (pspService: ICreateCharge) => {
        return new CreateChargeUseCase(pspService);
      },
      inject: [Pagarme],
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
  controllers: [CreateChargeController, CreateChargeOnPSPEventHandler],
})
export class CreditCardModule {}
