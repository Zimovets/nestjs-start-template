import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration, { validationSchema } from 'src/config/configuration';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validationSchema,
    }),
    MikroOrmModule.forRoot(),
    UserModule,
  ],
})
export class AppModule {}
