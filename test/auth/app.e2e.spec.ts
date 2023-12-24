import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/modules/app.module';
import { MikroORM } from '@mikro-orm/core';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    orm = testModule.get<MikroORM>(MikroORM);
    await orm.schema.createSchema();

    app = testModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect('Hello World from user module');
  });

  it('/auth/signup POST, should create user', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send({
        firstName: 'test',
        lastName: 'test',
        email: 'test@gmail.com',
        password: '11111111',
      })
      .expect(201)
      .then((res) => {
        const { userId, token, refreshToken } = res.body;
        expect(userId && token && refreshToken).toBeTruthy();
      });
  });

  it('/auth/signup POST, user already exist', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send({
        firstName: 'test',
        lastName: 'test',
        email: 'test@gmail.com',
        password: '11111111',
      })
      .expect(403);
  });

  it('/auth/signup POST, wrong password', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send({
        firstName: 'test2',
        lastName: 'test2',
        email: 'test2@gmail.com',
        password: '111111',
      })
      .expect(400)
      .then((res) => console.log(res.body));
  });

  it('/auth/signup POST, missing property', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send({
        lastName: 'test2',
        email: 'test2@gmail.com',
        password: '11111111',
      })
      .expect(400)
      .then((res) => console.log(res.body));
  });

  it('/auth/signup POST, missing property', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send({
        firstName: 'test2',
        email: 'test2@gmail.com',
        password: '11111111',
      })
      .expect(400)
      .then((res) => console.log(res.body));
  });

  it('/auth/signup POST, missing property', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send({
        firstName: 'test2',
        lastName: 'test2',
        password: '11111111',
      })
      .expect(400)
      .then((res) => console.log(res.body));
  });

  it('/auth/signup POST, missing property', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .set('Accept', 'application/json')
      .send({
        firstName: 'test2',
        lastName: 'test2',
        email: 'test2@gmail.com',
      })
      .expect(400)
      .then((res) => console.log(res.body));
  });

  it('/auth/signin POST, there is no user with this emaile', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'test1@gmail.com',
        password: '11111111',
      })
      .expect(400)
      .then((res) => console.log(res.body));
  });

  it('/auth/signin POST, wrong password', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'test@gmail.com',
        password: '11111112',
      })
      .expect(400)
      .then((res) => console.log(res.body));
  });

  it('/auth/signin POST, should signin', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .set('Accept', 'application/json')
      .send({
        email: 'test@gmail.com',
        password: '11111111',
      })
      .expect(200)
      .then((res) => {
        const { userId, token, refreshToken } = res.body;
        expect(userId && token && refreshToken).toBeTruthy();
      });
  });

  afterAll(async () => {
    await orm.schema.dropSchema();
    await app.close();
  });
});
