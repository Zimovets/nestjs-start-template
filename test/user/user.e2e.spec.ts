import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/modules/app.module';
import { MikroORM } from '@mikro-orm/core';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;
  let token: string;
  let userId: number;

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    orm = testModule.get<MikroORM>(MikroORM);
    await orm.schema.createSchema();

    app = testModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const result = await request(app.getHttpServer())
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send({
        firstName: 'test',
        lastName: 'test',
        email: 'test2@gmail.com',
        password: '11111111',
      });

    token = result.body.token;
    userId = result.body.userId;
  });

  it('/user GET, should get error', () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Accept', 'application/json')
      .expect(401);
  });

  it('/user GET, should get error', () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toEqual(userId);
      });
  });

  afterAll(async () => {
    await orm.schema.dropSchema();
    await app.close();
  });
});
