import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { File } from 'models/files.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TextBlock } from 'models/text-blocks.model';
import { AuthTokenModule } from 'modules/auth-token/auth-token.module';

@Module({
    imports: [SequelizeModule.forFeature([File,TextBlock]),AuthTokenModule],
    controllers: [FileController],
    providers: [FileService],
    exports:[FileService]
})
export class FileModule { }
