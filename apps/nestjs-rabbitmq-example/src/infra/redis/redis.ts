import { Injectable } from '@nestjs/common';

@Injectable()
export class Redis {
  private static data = new Map<string, any>();

  async get(key: string) {
    return Promise.resolve(Redis.data.get(key));
  }

  async set(key: string, value?: any) {
    Promise.resolve(Redis.data.set(key, value));
  }
}
