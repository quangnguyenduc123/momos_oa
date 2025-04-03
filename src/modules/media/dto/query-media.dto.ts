import { IsOptional, IsString, IsIn, IsNumber, IsPositive } from 'class-validator';
import { MediaType } from '../entities/media.entity';

export class QueryMediaDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsIn(Object.values(MediaType), { message: 'Type must be one of: image, video' })
  type?: MediaType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'], { message: 'Sort must be either "asc" or "desc"' })
  sort?: 'asc' | 'desc';

  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsPositive()
  offset?: number;
}