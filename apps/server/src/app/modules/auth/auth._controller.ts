// auth.controller.ts
import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth._service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('redirect')
  async handleRedirect(@Query('code') code: string, @Res() res: Response) {
    try {
      const data = await this.authService.exchangeCodeForToken(code);
      res.redirect(`/success?token=${data.access_token}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      res.redirect(`/error?message=${encodeURIComponent(error.message)}`);
    }
  }
}
