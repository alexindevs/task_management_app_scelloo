import { Response, NextFunction } from 'express';
import { TaskService } from '../services';
import { sendSuccess } from '../../utils/response';
import { taskQueryParamsSchema } from '../validators';
import { AuthenticatedRequest } from '../middleware';
import { ApiError } from '../../utils/api-error';

export class TaskController {
  private taskService = new TaskService();

  getAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new ApiError('Forbidden', 403);
      const query = taskQueryParamsSchema.parse(req.query);
      const result = await this.taskService.getAllTasks(query, req.user);
      return sendSuccess(res, 200, 'Tasks fetched successfully', result);
    } catch (err) {
      next(err);
    }
  };

  getOne = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new ApiError('Forbidden', 403);
      const task = await this.taskService.getTaskById(req.params.id, req.user);
      return sendSuccess(res, 200, 'Task fetched successfully', task);
    } catch (err) {
      next(err);
    }
  };

  create = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new ApiError('Forbidden', 403);
      const task = await this.taskService.createTask(req.body, req.user);
      return sendSuccess(res, 201, 'Task created successfully', task);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new ApiError('Forbidden', 403);
      const task = await this.taskService.updateTask(req.params.id, req.body, req.user);
      return sendSuccess(res, 200, 'Task updated successfully', task);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new ApiError('Forbidden', 403);
      const result = await this.taskService.deleteTask(req.params.id, req.user);
      return sendSuccess(res, 200, 'Task deleted successfully', result);
    } catch (err) {
      next(err);
    }
  };
}
