import { Response } from 'express';
type Tdata<T> = {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
};

const sendResponse = <T>(res: Response, data: Tdata<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
