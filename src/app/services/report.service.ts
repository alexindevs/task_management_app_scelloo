// src/app/services/report.service.ts
import { ReportRepository } from '../repositories/report.repository';
import { ApiError } from '../../utils/api-error';

export class ReportService {
  private reportRepo = new ReportRepository();

  async getAdminReport() {
    const [statusCounts, totalTasks] = await Promise.all([
      this.reportRepo.countAllByStatus(),
      this.reportRepo.countAllTasks(),
    ]);

    return {
      totalTasks,
      byStatus: statusCounts,
    };
  }

  async getTimeSpentForUser(user: { userId: string; role: string }, targetUserId?: string) {
    if (user.role !== 'admin' && targetUserId && user.userId !== targetUserId) {
      throw new ApiError('Forbidden', 403);
    }

    const userIdToUse = user.role === 'admin' ? targetUserId : user.userId;
    const total = await this.reportRepo.sumTimeSpentForUser(userIdToUse);

    return { userId: userIdToUse, totalTimeSpentSeconds: total };
  }

  async getTimeSpentForAll(user: { role: string }) {
    if (user.role !== 'admin') {
      throw new ApiError('Forbidden', 403);
    }

    const total = await this.reportRepo.sumTimeSpentAll();
    return { totalTimeSpentSeconds: total };
  }
}
