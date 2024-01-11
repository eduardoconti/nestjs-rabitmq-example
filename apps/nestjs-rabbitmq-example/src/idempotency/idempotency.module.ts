import { Module } from '@nestjs/common';
import { Redis } from '../infra/redis/redis';
import { IdempotencyRepository } from './infra/repositories/idempotency.repository';

@Module({
  providers: [Redis, IdempotencyRepository],
  exports: [IdempotencyRepository],
})
export class IdempotencyModule {}
