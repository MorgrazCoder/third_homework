import { Module } from '@nestjs/common';
import { ProfileModule } from 'modules/profile/profile.module';
import { AuthController } from './auth.controller';
import { LoginService, RegistrationService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'models/users.model';
import { AuthTokenModule } from '../auth-token/auth-token.module';

@Module({
    imports: [ProfileModule, SequelizeModule.forFeature([User]),AuthTokenModule],
    controllers: [AuthController],
    providers: [LoginService, RegistrationService],
    exports: []
})
export class AuthModule { }
