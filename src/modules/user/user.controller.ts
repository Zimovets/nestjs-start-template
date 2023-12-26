import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { EntityManager } from '@mikro-orm/postgresql';

@Controller('user')
export class UserController {
  constructor(private readonly em: EntityManager) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() req) {
    return req.user;
  }
}
