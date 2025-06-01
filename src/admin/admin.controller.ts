import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RedirectEntity } from 'src/entities/redirect.entity';

@Controller('__api/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('redirects')
  @UseGuards(AuthGuard)
  async getAllRedirects() {
    return await this.adminService.getAllRedirects();
  }

  @Post('redirect')
  @UseGuards(AuthGuard)
  async saveRedirect(@Body() redirect: RedirectEntity) {
    return await this.adminService.saveRedirect(redirect);
  }

  @Delete('redirect')
  @UseGuards(AuthGuard)
  async deleteRedirect(@Body('path') path: string) {
    return await this.adminService.deleteRedirect(path);
  }
}
