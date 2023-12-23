import { Options } from '@mikro-orm/core';
import { User } from './src/entities/user.entity';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const env = configService.get('NODE_ENV');

const MikroOrmConfig: Options = {
  entities: [User],
  type: 'postgresql',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  user: configService.get('POSTGRES_USERNAME'),
  password: configService.get('POSTGRES_PASSWORD'),
  dbName: env === 'test' ? 'testdb' : configService.get('POSTGRES_DB'),
  debug: env === 'development',
};

export default MikroOrmConfig;
