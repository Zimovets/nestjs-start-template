import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { EntityManager } from '@mikro-orm/postgresql';
import { Connection, MikroORM } from '@mikro-orm/core';

describe('AppController (e2e)', () => {
  jest.setTimeout(50000);
  let app: INestApplication;
  let em: EntityManager;
  let orm: MikroORM;
  let connection: Connection;
  const testDBName = 'testdb';

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    em = testModule.get<EntityManager>(EntityManager).fork();
    em.config['options'].dbName = testDBName;
    connection = await em.getConnection();

    await connection.execute(`create database ${testDBName};`);
    // await connection.execute(sql1);
    // await connection.execute(sql2);
    // await connection.execute(sql3);

    orm = testModule.get<MikroORM>(MikroORM);
    const migrator = orm.getMigrator();
    await migrator.up();

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
    await connection.execute(`drop database ${testDBName};`);
    await app.close();
  });
});

const sql1 = `SELECT pg_terminate_backend(pg_stat_activity.pid) 
FROM pg_stat_activity 
WHERE pg_stat_activity.datname = 'saas_marketing_platform' 
AND pid <> pg_backend_pid();`;

const sql2 = `create database testdb with template saas_marketing_platform owner postgres;`;

const sql3 = `DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public')
    LOOP
        EXECUTE 'TRUNCATE TABLE public.' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;`;

// TODO: investigate migrations methods
// TODO: move sql to file
