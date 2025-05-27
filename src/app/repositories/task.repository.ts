import { Task } from '../../models';
import { BaseRepository } from './base.repository';

type TaskFilterOptions = {
  page?: number;
  limit?: number;
  status?: 'pending' | 'in-progress' | 'completed';
  userId?: string;
};

export class TaskRepository extends BaseRepository<Task> {
  constructor() {
    super(Task);
  }

  async getFilteredTasks(options: TaskFilterOptions = {}) {
    const {
      page = 1,
      limit = 10,
      status,
      userId,
    } = options;
  
    const where: any = {};
  
    if (status) where.status = status;
    if (userId) where.userId = userId;
  
    const offset = (page - 1) * limit;
  
    const { rows: tasks, count: total } = await this.model.findAndCountAll({
      where,
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });
  
    return { tasks, total };
  }
  

  async createTask(data: {
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    userId: string;
  }) {
    return this.create(data);
  }

  async findById(id: string) {
    return this.findOne({ id });
  }
}
