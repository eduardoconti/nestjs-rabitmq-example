import {
  CreateChargeInputProps,
  ICreateCharge,
} from '@libs/credit-card/domain/contracts/psp-service.interface';
import { Pagarme } from '@libs/credit-card/infra/psp/pagarme/pagarme.service';
import { Controller, Inject } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class CreateChargeOnPSPEventHandler {
  constructor(
    @Inject(Pagarme)
    private readonly pspService: ICreateCharge,
  ) {}
  @EventPattern('CREATE_CHARGE_PSP')
  async handle(
    @Payload() payload: CreateChargeInputProps,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    console.log(payload);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.pspService.createCharge(payload);
    } catch (error) {
      console.log(error);
    }
    channel.ack(originalMsg);
  }
}
