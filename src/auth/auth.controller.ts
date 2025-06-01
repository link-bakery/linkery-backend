import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('__api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body('password') password: string) {
    return this.authService.login(password);
  }

  @Post('changepw')
  @UseGuards(AuthGuard)
  changepw(
    @Body('oldpassword') oldpassword: string,
    @Body('newpassword') newpassword: string,
  ) {
    return this.authService.changepw(oldpassword, newpassword);
  }
}
