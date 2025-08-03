import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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

  @Put('redirect/:id')
  @UseGuards(AuthGuard)
  async editRedirect(
    @Param('id') id: number,
    @Body() editRedirect: RedirectEntity,
  ) {
    return await this.adminService.editRedirect(id, editRedirect);
  }

  @Delete('redirect/:id')
  @UseGuards(AuthGuard)
  async deleteRedirect(@Param('id') id: number) {
    return await this.adminService.deleteRedirect(id);
  }
}
