import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BoardDto {
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
  @ValidateNested()
  @Type(() => BoardDto)
  board!: BoardDto;
}
