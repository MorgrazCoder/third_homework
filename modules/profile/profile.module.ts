import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService} from './profile.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from 'models/profiles.model';
import { AuthTokenModule } from 'modules/auth-token/auth-token.module';

@Module({
    imports: [SequelizeModule.forFeature([Profile]),AuthTokenModule],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [ProfileService]
})
export class ProfileModule { }
