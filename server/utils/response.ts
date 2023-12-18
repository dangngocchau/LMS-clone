import { Response } from 'express';
export class ApiResponse<T> {
  data: T = {} as T;
  message = 'Success';
  statusCode = 200;

  constructor(data?: T, statusCode?: number, message?: string) {
    data && (this.data = data);
    statusCode && (this.statusCode = statusCode);
    message && (this.message = message);
  }

  public send(res: Response): void {
    res.status(this.statusCode).json({
      data: this.data,
      statusCode: this.statusCode,
      message: this.message,
    });
  }
}
