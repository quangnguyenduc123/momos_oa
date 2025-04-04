import { Media } from "../entities/media.entity";

export class QueryMediaResponseDto {
    total: number;
    data: Media[];
  }