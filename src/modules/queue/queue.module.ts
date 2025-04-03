import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { getBullConfig } from 'src/config/bullmq';
import { QueueService } from './queue.service';

@Module({
  imports: [
    BullModule.forRoot(getBullConfig()),
    BullModule.registerQueue({
      name: 'media',
    }),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}