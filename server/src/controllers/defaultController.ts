import * as express from 'express';

export default function defaultController(_: express.Request, res: express.Response): void {
  res.status(404).json({
    success: false,
    error: {
      status: 404,
      message: 'Resource not found',
    },
    data: null,
  });
}
