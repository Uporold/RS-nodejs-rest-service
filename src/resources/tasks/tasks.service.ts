import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskDto } from './task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getAll(boardId: string): Promise<TaskEntity[]> {
    return this.taskRepository.find({ where: { boardId } });
  }

  async create(boardId: string, taskDto: TaskDto): Promise<TaskEntity> {
    const task = this.taskRepository.create({ ...taskDto, boardId });
    await this.taskRepository.save(task);
    return task;
  }

  async getById(id: string, boardId: string): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({ where: { id, boardId } });
    if (!task) {
      throw new NotFoundException(
        `Task with id ${id} not found in board with id ${boardId}`
      );
    }
    return task;
  }

  async update(
    id: string,
    boardId: string,
    task: TaskDto
  ): Promise<TaskEntity> {
    const updatedTask = await this.getById(id, boardId);
    Object.assign(updatedTask, task);
    await this.taskRepository.save(updatedTask);
    return updatedTask;
  }

  async delete(id: string, boardId: string): Promise<void> {
    const result = await this.taskRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Task with id ${id} not found in board with id ${boardId}`
      );
    }
  }
}
