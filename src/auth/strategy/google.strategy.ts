// auth/strategies/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {
  Strategy,
  VerifyCallback,
  StrategyOptionsWithRequest,
} from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super(<StrategyOptionsWithRequest>{
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = {
      provider: 'google',
      providerId: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName,
      photo: profile.photos?.[0]?.value,
    };
    done(null, user);
  }
}
