import { Response } from 'express';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function errorResponse(
  res: Response,
  status: number,
  message: string,
  details?: any
) {
  res.status(status).json({
    error: message,
    ...(details && { details }),
    timestamp: new Date().toISOString()
  });
}

export function badRequest(res: Response, message: string, details?: any) {
  errorResponse(res, 400, message, details);
}

export function unauthorized(res: Response, message: string = 'Unauthorized') {
  errorResponse(res, 401, message);
}

export function forbidden(res: Response, message: string = 'Forbidden') {
  errorResponse(res, 403, message);
}

export function notFound(res: Response, message: string = 'Not found') {
  errorResponse(res, 404, message);
}

export function internalError(res: Response, message: string = 'Internal server error') {
  errorResponse(res, 500, message);
}
