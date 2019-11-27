import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMsg(): string {
    return 'Welcome to NestJS Intro!';
  }
}
