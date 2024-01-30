import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth._service';
import { SpotifyOauthGuard } from './guards/spotify-oauth.guard';
import { Profile } from 'passport-spotify';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(SpotifyOauthGuard)
  @Get('login')
  login(): void {
    return;
  }

  @UseGuards(SpotifyOauthGuard)
  @Get('redirect')
  async spotifyAuthRedirect(
    @Req() req: any,
    @Res() res: any,
  ): Promise<Response> {
    const {
      user,
      authInfo,
    }: {
      user: Profile;
      authInfo: {
        accessToken: string;
        refreshToken: string;
        expires_in: number;
      };
    } = req;

    if (!user) {
      res.redirect('/');
    }

    req.user = undefined;

    const jwt = this.authService.login(user);

    res.set('authorization', `Bearer ${jwt}`);

    return res.status(201).json({ authInfo, user });
  }
}
