
import { BullModuleOptions } from '@nestjs/bull';

export const getBullConfig = (): BullModuleOptions => {
  return {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    },
  };
};