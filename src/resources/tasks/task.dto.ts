import { IsNotEmpty } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  title!: string;
  @IsNotEmpty()
  order!: number;
  @IsNotEmpty()
  description!: string;
  userId!: string | null;
  columnId!: string;
}
