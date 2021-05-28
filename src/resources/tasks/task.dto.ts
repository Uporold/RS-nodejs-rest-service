export interface TaskDto {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  columnId: string;
}

export interface TaskWithBoardDto extends TaskDto {
  boardId: string;
}
