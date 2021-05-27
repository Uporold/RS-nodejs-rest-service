export interface ColumnDto {
  title: string;
  order: number;
}

export interface BoardDto {
  title: string;
  columns: ColumnDto[];
}
