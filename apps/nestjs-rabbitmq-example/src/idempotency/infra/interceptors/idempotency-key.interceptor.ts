import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IdempotencyRepository } from '../repositories';
import { IIdempotencyRepository } from '@api/idempotency/domain/repositories';

@Injectable()
export class IdempotencyKeyInterceptor implements NestInterceptor {
  constructor(
    @Inject(IdempotencyRepository)
    private readonly idempotencyRepository: IIdempotencyRepository,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const idempotencyKey = request.headers['x-idempotency-key'];

    if (!idempotencyKey) {
      throw new BadRequestException(
        "Header 'x-idempotency-key' is required for this request.",
      );
    }

    if (!this.isValidUUID(idempotencyKey)) {
      throw new BadRequestException(
        "Header 'x-idempotency-key' must be a UUID.",
      );
    }

    const idempotencyModel = await this.idempotencyRepository.find(
      idempotencyKey,
    );

    if (idempotencyModel) {
      return of(idempotencyModel.response);
    }

    await this.idempotencyRepository.preSave(idempotencyKey);

    return next.handle().pipe(
      tap(async (data) => {
        await this.idempotencyRepository.update(idempotencyKey, data);
        return data;
      }),
    );
  }

  private isValidUUID(uuid: string) {
    const uuidRegex =
      /(?:^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$)|(?:^0{8}-0{4}-0{4}-0{4}-0{12}$)/u;
    return uuidRegex.test(uuid);
  }
}
