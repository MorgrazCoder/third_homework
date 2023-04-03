import { Module } from '@nestjs/common';
import { TextBlockService } from './text-block.service';
import { TextBlockController } from './text-block.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthTokenModule } from 'modules/auth-token/auth-token.module';
import { TextBlock } from 'models/text-blocks.model';
import { FileModule } from 'modules/file/file.module';
import { File } from 'models/files.model';

@Module({
    imports: [SequelizeModule.forFeature([TextBlock,File]),AuthTokenModule,FileModule],
    controllers: [TextBlockController],
    providers: [TextBlockService],
})
export class TextBlockModule { }
