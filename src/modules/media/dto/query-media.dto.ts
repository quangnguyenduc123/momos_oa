import { IsOptional, IsString, IsIn, IsPositive } from 'class-validator';

export class QueryMediaDto {

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'], { message: 'Sort must be either "asc" or "desc"' })
  sort: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @IsPositive()
  limit: number = 10;

  @IsOptional()
  @IsPositive()
  offset: number = 0;
}