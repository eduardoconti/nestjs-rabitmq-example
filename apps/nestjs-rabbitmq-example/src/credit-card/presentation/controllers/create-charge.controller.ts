import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateChargeUseCase } from '../../app/use-cases/create-charge.use-case';
import { ICreateChargeUseCase } from '../../domain/use-cases/create-charge.use-case';
import { CreateChargeInputProps } from '../../domain/contracts/psp-service.interface';

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
