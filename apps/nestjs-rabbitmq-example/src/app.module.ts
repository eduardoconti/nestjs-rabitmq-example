import { Module } from '@nestjs/common';
import { CreditCardApiModule } from './credit-card/credit-card.module';

@Module({
  imports: [CreditCardApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
