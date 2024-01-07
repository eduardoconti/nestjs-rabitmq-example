import { CreateChargeUseCase } from '@libs/credit-card/app/use-cases/create-charge.use-case';
import { CreateChargeInputProps } from '@libs/credit-card/domain/contracts/psp-service.interface';
import { ICreateChargeUseCase } from '@libs/credit-card/domain/use-cases/create-charge.use-case';
import { Body, Controller, Inject, Post } from '@nestjs/common';

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
