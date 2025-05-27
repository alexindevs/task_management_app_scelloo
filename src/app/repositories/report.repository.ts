// src/app/repositories/report.repository.ts
import { Op, fn, col, literal } from 'sequelize';
import { Task, User } from '../../models';

export class ReportRepository {
  async countCompletedTasks(userId: string) {
    return Task.count({ where: { userId, status: 'completed' } });
  }

  async countAllByStatus() {
    const statuses = ['pending', 'in-progress', 'completed'];
    const counts = await Promise.all(
      statuses.map(async (status) => ({
        status,
        count: await Task.count({ where: { status } })
      }))
    );
    return counts;
  }

  async countAllTasks() {
    return Task.count();
  }

  async countAllByUserEmail() {
    const rows = await Task.findAll({
      attributes: [[fn('COUNT', col('Task.id')), 'total']],
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
      group: ['User.email'],
      raw: true,
      nest: true,
    });

    return rows.map((row: any) => ({
      email: row.User.email,
      total: Number(row.total)
    }));
  }

  async sumTimeSpentForUser(userId?: string) {
    const where = userId ? { userId } : {};
    const rows = await Task.findAll({ where, raw: true });

    return rows.reduce((acc, row) => {
      const created = new Date(row.createdAt).getTime();
      const updated = new Date(row.updatedAt).getTime();
      return acc + Math.max((updated - created) / 1000, 0);
    }, 0);
  }

  async sumTimeSpentAll() {
    return this.sumTimeSpentForUser();
  }
}
