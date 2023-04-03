import { JwtModule } from '@nestjs/jwt';
import { AuthTokenController } from './auth-token.controller';
import { AuthTokenService } from './auth-token.service';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from 'models/tokens.model';

@Module({
    imports: [JwtModule.register({}),SequelizeModule.forFeature([Token])],
    controllers: [
        AuthTokenController,],
    providers: [
        AuthTokenService,],
    exports:[AuthTokenService]
})
export class AuthTokenModule { }
