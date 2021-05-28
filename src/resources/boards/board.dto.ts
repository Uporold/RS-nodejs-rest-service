export interface ColumnDto {
  id: string;
  title: string;
  order: number;
}

export interface BoardDto {
  title: string;
  columns: ColumnDto[];
}
