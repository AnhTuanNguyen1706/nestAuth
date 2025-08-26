// auth/strategies/github.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, StrategyOptionsWithRequest } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super(<StrategyOptionsWithRequest>{
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
      profileFields: ['id', 'displayName', 'photos', 'email'],
      passReqToCallback: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    const user = {
      provider: 'github',
      providerId: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName || profile.username,
      photo: profile.photos?.[0]?.value,
    };
    done(null, user);
  }
}
