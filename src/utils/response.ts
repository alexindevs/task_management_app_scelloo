// src/utils/response.ts
import { Response } from 'express';

export function sendSuccess(res: Response, code = 200, message = 'Success', data: any = null) {
  res.status(code).json({ code, message, data });
  return;
}
