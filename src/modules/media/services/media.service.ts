import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { Media } from '../entities/media.entity';
import { CreateMediaDto } from '../dto/create-media.dto';
import { QueryMediaDto } from '../dto/query-media.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async createMedia(createMediaDto: CreateMediaDto): Promise<Media> {
    const media = this.mediaRepository.create(createMediaDto);
    return this.mediaRepository.save(media);
  }

  async queryMedia(query: QueryMediaDto): Promise<Media[]> {
    return await this.mediaRepository.find({
      select: {
        id: true,
        type: true,
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
        ...(query.type && { title: query.title }),
      }
    });
  }
}