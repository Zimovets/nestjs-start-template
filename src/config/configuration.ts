import * as Joi from 'joi';

export interface IConfig {
  environment: string;
  port: number;
  postgres: {
    username: string;
    password: string;
    host: string;
    port: number;
    db: string;
  };
  jwt: {
    secret: string;
    expiresIn: number;
    refreshExpiresIn: number;
  };
  auth: {
    google: {
      clientId: string;
      secret: string;
      callbackUrl: string;
    };
  };
}

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.number().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.number().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required(),
});

export default (): IConfig => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT),
  postgres: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    db: process.env.POSTGRES_DB,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
    refreshExpiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN),
  },
  auth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: process.env.GOOGLE_CALLBACK_URL,
    },
  },
});
