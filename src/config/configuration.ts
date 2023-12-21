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
}

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  PORT: Joi.number().required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
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
});
