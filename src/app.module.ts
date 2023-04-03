import { FileModule } from '../modules/file/file.module';
import { TextBlockModule } from '../modules/text-block/text-block.module';
import { AuthTokenModule } from '../modules/auth-token/auth-token.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'modules/auth/auth.module';
import { Profile } from 'models/profiles.model';
import { Token } from 'models/tokens.model';
import { User } from 'models/users.model';
import { ProfileModule } from 'modules/profile/profile.module';
import { File } from 'models/files.model';
import { TextBlock } from 'models/text-blocks.model';
require('dotenv').config();


@Module({
  imports: [
    FileModule,
    TextBlockModule,
    AuthTokenModule, AuthModule, ProfileModule, SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.host,
      port: +process.env.PG_PORT,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [User, Profile, Token, File, TextBlock],
      autoLoadModels: true,
      synchronize: true
    })],
})
export class AppModule { }
