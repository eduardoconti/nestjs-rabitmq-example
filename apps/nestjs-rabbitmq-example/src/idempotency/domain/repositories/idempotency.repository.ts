import { IdempotencyModel } from '../models/idempotency.model';

export interface IIdempotencyRepository {
  find(key: string): Promise<IdempotencyModel | undefined>;
  preSave(key: string): Promise<void>;
  update(key: string, response: any): Promise<void>;
}
