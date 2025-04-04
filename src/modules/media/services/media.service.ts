import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Media } from '../entities/media.entity';
import { CreateMediaDto } from '../dto/create-media.dto';
import { QueryMediaDto } from '../dto/query-media.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectQueue('media-crawler')
    private readonly mediaCrawlerQueue: Queue
  ) {}

  async createMedia(createMediaDto: CreateMediaDto): Promise<{ jobId: string | number }> {
    const job = await this.mediaCrawlerQueue.add('crawl-media', createMediaDto, {
      attempts: 3,
      backoff: {
        type: 'exponential',
      },
    });

    return { jobId: job.id };
  }

  async queryMedia(query: QueryMediaDto): Promise<Media[]> {
    return await this.mediaRepository.find({
      select: {
        id: true,
        url: true,
        title: true,
        description: true,
      },
      order: {
        created_at: query.sort === 'asc' ? 'ASC' : 'DESC',
      },
      take: query.limit || 10,
      skip: query.offset || 0,
      where: {
        ...(query.title && { title: Like(`%${query.title}%`) }),
        ...(query.description && { description: Like(`%${query.description}%`) }),
      }
    });
  }
}