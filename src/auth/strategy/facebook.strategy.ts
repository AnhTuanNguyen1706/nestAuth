import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    const user = {
      provider: 'facebook',
      providerId: profile.id,
      email: profile.emails?.[0]?.value,
      name: profile.displayName,
      photo: profile.photos?.[0]?.value,
      accessToken,
    };
    done(null, user);
  }
}
