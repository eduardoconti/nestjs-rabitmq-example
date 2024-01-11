import { IdempotencyKeyInterceptor } from '@api/idempotency/infra/interceptors';
import { CreateChargeUseCase } from '@libs/credit-card/app/use-cases';
import { CreateChargeInputProps } from '@libs/credit-card/domain/contracts';
import { ICreateChargeUseCase } from '@libs/credit-card/domain/use-cases';

import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';

@UseInterceptors(IdempotencyKeyInterceptor)
@Controller('charge')
export class CreateChargeController {
  constructor(
    @Inject(CreateChargeUseCase)
    private readonly createChargeUseCase: ICreateChargeUseCase,
  ) {}

  @Post()
  async handle(@Body() props: CreateChargeInputProps) {
    return await this.createChargeUseCase.execute(props);
  }
}
