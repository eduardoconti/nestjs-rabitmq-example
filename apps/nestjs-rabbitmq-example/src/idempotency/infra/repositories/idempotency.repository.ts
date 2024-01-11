import { Redis } from 'apps/nestjs-rabbitmq-example/src/infra/redis/redis';
import { IIdempotencyRepository } from '../../domain/repositories/idempotency.repository';
import { Injectable } from '@nestjs/common';
import { IdempotencyModel } from '../../domain/models/idempotency.model';

@Injectable()
export class IdempotencyRepository implements IIdempotencyRepository {
  constructor(private readonly redis: Redis) {}

  async find(key: string): Promise<IdempotencyModel | undefined> {
    const data = await this.redis.get(key);
    if (data) {
      return { key, response: data };
    }
  }

  async preSave(key: string): Promise<void> {
    await this.redis.set(key);
  }

  async update(key: string, response: any): Promise<void> {
    await this.redis.set(key, response);
  }
}
