import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { MikroORM } from '@mikro-orm/core';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    orm = testModule.get<MikroORM>(MikroORM);
    await orm.schema.createSchema();

    app = testModule.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect('Hello World from user module');
  });

  afterAll(async () => {
    await orm.schema.dropSchema();
    await app.close();
  });
});
