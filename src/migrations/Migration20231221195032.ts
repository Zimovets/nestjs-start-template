import { Migration } from '@mikro-orm/migrations';

export class Migration20231221195032 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" varchar(255) not null, "updated_at" varchar(255) not null, "deleted_at" timestamptz(0) null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, constraint user_password_check check (LENGTH(password) >= 8));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
