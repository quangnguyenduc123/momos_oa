import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import { MediaService } from '../services/media.service';
import { CreateMediaDto } from '../dto/create-media.dto';
import { AuthGuard } from '@nestjs/passport';
import { QueryMediaDto } from '../dto/query-media.dto';
import { Media } from '../entities/media.entity';

@Controller('media')
@UseGuards(AuthGuard('jwt'))
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createMedia(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.createMedia(createMediaDto);
  }

  @Get()
  async getMedia(@Query() query: QueryMediaDto): Promise<Media[]> {
    return await this.mediaService.queryMedia(query);
  }
}