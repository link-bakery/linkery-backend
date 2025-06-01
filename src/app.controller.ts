import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller('__redirectMe')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('*path')
  @Redirect('https://linkery.madudev.de/docs/redirect-failed')
  async redirect(@Req() req: Request) {
    return await this.appService.redirect(req.path);
  }
}
