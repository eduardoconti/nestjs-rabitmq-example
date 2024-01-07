import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateChargeUseCase } from 'src/credit-card/app/use-cases/create-charge.use-case';
import { CreateChargeInputProps } from 'src/credit-card/domain/contracts/psp-service.interface';
import { ICreateChargeUseCase } from 'src/credit-card/domain/use-cases/create-charge.use-case';

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
