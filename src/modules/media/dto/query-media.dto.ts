import { IsOptional, IsString, IsIn, IsPositive } from 'class-validator';

export class QueryMediaDto {
  @IsOptional()
  @IsString()
  title?: string;

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