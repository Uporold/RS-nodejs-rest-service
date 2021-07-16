import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BoardDto {
  @IsString()
  title!: string;
  @ValidateNested({ each: true })
  @Type(() => ColumnDto)
  columns!: ColumnDto[];
}

export class ColumnDto {
  id!: string;
  @IsString()
  title!: string;
  order!: number;
  @Type(() => BoardDto)
  board!: BoardDto;
}
