import { Options } from '@mikro-orm/core';
import { User } from './src/entities/user.entity';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const MikroOrmConfig: Options = {
  entities: [User],
  type: 'postgresql',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  user: configService.get('POSTGRES_USERNAME'),
  password: configService.get('POSTGRES_PASSWORD'),
  dbName: configService.get('POSTGRES_DB'),
  debug: true,
};

export default MikroOrmConfig;
