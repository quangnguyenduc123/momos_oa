import { Module } from '@nestjs/common';
import { MediaController } from './controllers/media.controller';
import { MediaService } from './services/media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { BullModule } from '@nestjs/bull';
import { MediaCrawlerProcessor } from '../queue/queue.service';
import { PinoLoggerService } from 'src/logger/pino-logger.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Media]),
    BullModule.registerQueue({
      name: 'media-crawler',
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false,
      },
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService, MediaCrawlerProcessor, PinoLoggerService]
})
export class MediaModule {}
