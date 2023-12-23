import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { validationSchema } from 'src/config/configuration';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validationSchema,
    }),
    {
      ...JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          secret: config.get('jwt.secret') as string,
          signOptions: {
            expiresIn: config.get('jwt.expiresIn') as number,
          },
        }),
      }),
      global: true,
    },
    MikroOrmModule.forRoot(),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}

// TODO: implement validation
// TODO:  auth with email password
// TODO: end-to-end test to check user dto validation and db validation
