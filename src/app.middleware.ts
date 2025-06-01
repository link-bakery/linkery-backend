import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl.startsWith('/__redirectMe')) return next();

    if (!req.originalUrl.startsWith('/__api')) {
      return res.redirect('/__redirectMe' + req.originalUrl);
    }

    next();
  }
}
