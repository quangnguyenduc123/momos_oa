import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from '../media/entities/media.entity';
import { Repository } from 'typeorm';
import { MediaJobData } from './queue.types';
import { PinoLoggerService } from 'src/logger/pino-logger.service';

@Processor('media-crawler')
export class MediaCrawlerProcessor {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly logger: PinoLoggerService,
  ) {
  }
  @Process('crawl-media')
  async handleCrawlMedia(job: Job<MediaJobData>) {
    try {
      const { url, title, description } = job.data;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const mediaUrls = {
        images: [] as string[],
        videos: [] as string[]
      };

      // Find images
      $('img').each((_, element) => {
        const imgUrl = $(element).attr('src');
        if (imgUrl) mediaUrls.images.push(imgUrl);
      });

      // Find videos
      $('video source').each((_, element) => {
        const videoUrl = $(element).attr('src');
        if (videoUrl) mediaUrls.videos.push(videoUrl);
      });

      const media = this.mediaRepository.create({
        url,
        title,
        description,
        images: JSON.stringify(mediaUrls.images),
        videos: JSON.stringify(mediaUrls.videos),
      });

      await this.mediaRepository.save(media);
    } catch (error) {
      this.logger.error(
        `Failed to crawl media: ${error.message}`,
        error.stack,
        'MediaCrawler'
      );
    }
  }
}