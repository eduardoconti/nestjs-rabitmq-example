import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { CreateChargeInputProps } from 'src/credit-card/domain/contracts/psp-service.interface';

export class CreateChargePublisher {
  constructor(
    @Inject('create_charge_publisher')
    private readonly clientProxy: ClientProxy,
  ) {}

  async publish(data: CreateChargeInputProps): Promise<void> {
    await firstValueFrom(
      this.clientProxy.emit('CREATE_CHARGE_PSP', data).pipe(
        catchError((exception: Error) => {
          return throwError(() => new Error(exception.message));
        }),
      ),
    );
  }
}