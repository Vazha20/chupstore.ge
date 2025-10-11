import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      const user = await this.authService.register(dto);
      return { message: 'რეგისტრაცია წარმატებით დასრულდა!' }; // ✅ ბექიდან მესიჯი
    } catch (error: any) {
      throw new BadRequestException(error.message || 'რეგისტრაცია ვერ განხორციელდა');
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      const token = await this.authService.login(dto);
      return { token, message: 'შესვლა წარმატებით შესრულდა!' }; // ✅ ბექიდან მესიჯი
    } catch (error: any) {
      throw new BadRequestException(error.message || 'შესვლა ვერ განხორციელდა');
    }
  }
}
