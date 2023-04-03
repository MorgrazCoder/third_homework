import { Injectable,BadRequestException } from '@nestjs/common';
import { TextBlockDto } from './dto/text.block.dto';
import { TextBlock } from 'models/text-blocks.model';
import { FileDto } from 'modules/file/dto/file.dto';
import { EssenceTable } from 'enums/essence-table.enum';
import { FileService } from 'modules/file/file.service';

@Injectable()
export class TextBlockService {
    constructor(
        private readonly fileService:FileService
    ){}

    async textBlockCreate(files:Array<Express.Multer.File>,dto: TextBlockDto) {
        try {
           if(!dto||!files){
            throw new BadRequestException("Ошибка данных")
           }
           const data = await TextBlock.create(dto);
           const dataFiles = new FileDto(data.dataValues.id.toString(),EssenceTable.BLOCK);
           await this.fileService.fileCreate(files,dataFiles)
        } catch (error) {
            throw error;
        }
    }

    async textBlockRemove(text_block_id:number) {
        try {
            if(!await TextBlock.findOne({where:{id:text_block_id}})){
                throw new BadRequestException("Запись не найдена");
            }
            await TextBlock.destroy({where:{id:text_block_id}});
            await this.fileService.onBlockRemove();
        } catch (error) {
            throw error
        }
    }

    async textBlockUpdate(block_id:number,dto: TextBlockDto,files:Array<Express.Multer.File>) {
        try {
            if(!await TextBlock.findOne({where:{id:block_id}})){
                throw new BadRequestException("Запись не найдена");
            }
            const textBlock = await TextBlock.findOne({where:{id:block_id}});
            textBlock.set(dto).save();
            if(files.length){
                const essence_table = EssenceTable.BLOCK;
                const essence_id = block_id.toString();
                const fileDto = new FileDto(essence_id,essence_table);
                await this.fileService.onTextBlockUpdate(fileDto,files);
            }
        } catch (error) {
            throw error
        }
    }

    async textBlocksGet(group?:string) {
        try {
            if(!group){
                return await TextBlock.findAll({attributes:["id","block_name","block_text"]}).then(block=>{
                    return block.map(el=>el.dataValues)
                })
            }else{
                return await TextBlock.findAll({attributes:["id","block_name","block_text"],where:{block_group:group}}).then(block=>{
                    return block.map(el=>el.dataValues)
                })
            }
        } catch (error) {
            throw error;
        }
    }
}
