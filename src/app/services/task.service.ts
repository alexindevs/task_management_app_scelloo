import { TaskRepository } from '../repositories';
import { Task } from '../../models';
import { ApiError } from '../../utils/api-error';

export class TaskService {
  private taskRepo = new TaskRepository();

  async getAllTasks(query: any, user: { userId: string; role: string }) {
    const { page = 1, limit = 10, status } = query;
    const filters: any = { page: Number(page), limit: Number(limit) };

    if (status) filters.status = status;
    if (user.role !== 'admin') filters.userId = user.userId;

    const { tasks, total } = await this.taskRepo.getFilteredTasks(filters);

    const totalPages = Math.ceil(total / filters.limit);
    const currentPage = filters.page;
    const hasMore = currentPage < totalPages;

    return {
      pagination: {
        totalRecords: total,
        totalPages,
        currentPage,
        hasMore,
      },
      tasks,
    };
  }

  async createTask(data: { title: string; description: string; status: 'pending' | 'in-progress' | 'completed'; userId: string }, user: { userId: string; role: string }) {
    const assignedUserId = user.role === 'admin' ? data.userId ?? user.userId : user.userId;
    return this.taskRepo.createTask({ ...data, userId: assignedUserId });
  }

  async getTaskById(id: string, user: { userId: string; role: string }) {
    const task = await this.taskRepo.findById(id);
    if (!task) throw new ApiError('Task not found', 404);
    if (user.role !== 'admin' && task.userId !== user.userId) throw new ApiError('Forbidden', 403);
    return task;
  }

  async updateTask(id: string, data: Partial<Task>, user: { userId: string; role: string }) {
    const task = await this.taskRepo.findById(id);
    if (!task) throw new ApiError('Task not found', 404);
    if (user.role !== 'admin' && task.userId !== user.userId) throw new ApiError('Forbidden', 403);

    await task.update(data);
    return task;
  }

  async deleteTask(id: string, user: { userId: string; role: string }) {
    const task = await this.taskRepo.findById(id);
    if (!task) throw new ApiError('Task not found', 404);
    if (user.role !== 'admin' && task.userId !== user.userId) throw new ApiError('Forbidden', 403);

    await task.destroy();
    return { success: true };
  }
}
