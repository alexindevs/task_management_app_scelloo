import { Response, NextFunction } from 'express';
import { ReportService } from '../services/report.service';
import { sendSuccess } from '../../utils/response';
import { AuthenticatedRequest } from '../middleware';
import { ApiError } from '../../utils/api-error';

export class ReportController {
  private reportService = new ReportService();

  getAdminReport = async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const report = await this.reportService.getAdminReport();
      return sendSuccess(res, 200, 'Admin report generated', report);
    } catch (err) {
      next(err);
    }
  };

  getTime = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new ApiError('Forbidden', 403);
      const userId = req.query.userId as string;
      if (userId && userId !== '') {
        const data = await this.reportService.getTimeSpentForUser(req.user, userId);
        return sendSuccess(res, 200, 'Time spent for user calculated', data);
      } else {
        const data = await this.reportService.getTimeSpentForAll(req.user);
        return sendSuccess(res, 200, 'Time spent across platform calculated', data);
      }
    } catch (err) {
      next(err);
    }
  };
}
