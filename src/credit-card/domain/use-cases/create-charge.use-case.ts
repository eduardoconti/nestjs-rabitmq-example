import {
  CreateChargeInputProps,
  CreateChargeOutputProps,
} from '../contracts/psp-service.interface';

export interface ICreateChargeUseCase {
  execute(
    props: CreateChargeInputProps,
  ): Promise<Omit<CreateChargeOutputProps, 'pspId' | 'value'>>;
}
