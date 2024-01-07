import { Module } from '@nestjs/common';
import { CreditCardModule } from './credit-card/credit-card.module';

@Module({
  imports: [CreditCardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
