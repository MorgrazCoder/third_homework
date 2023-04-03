import { BadRequestException, Injectable } from '@nestjs/common';
import { FileDto } from './dto/file.dto';
import { resolve } from "path";
import { sha256 } from 'js-sha256';
import { writeFile } from 'fs';
import { FileNewDto } from './dto/file-new.dto';
import { File } from 'models/files.model';
import { TextBlock } from 'models/text-blocks.model';
import rimraf from "rimraf"
import { Op } from 'sequelize';

@Injectable()
export class FileService {
    async fileCreate(files: Array<Express.Multer.File>, dto: FileDto) {
        try {
            if (!files.length || !dto || !await TextBlock.findOne({ where: { id: dto.essence_id } })) {
                throw new BadRequestException("Отсутствуют данные");
            }
            files.forEach(async file => {
                const file_name = await this.createFileName(file.originalname.split('.').pop());
                const file_path = await this.createPathForSave("source", file_name);
                const file_buffer = file.buffer;
                const { essence_id, essence_table } = dto;
                const newFile = new FileNewDto(file_name, file_path, file_buffer, parseInt(essence_id), essence_table);

                await this.writeFileLocal(newFile)
                    .then(async file => {
                        await this.saveFileInDb(file);
                    })
            })
        } catch (error) {
            throw error;
        }
    }

    async removeAllByActivity(){
        try {
            const filePathes = await File.findAll({where:{[Op.or]:[{essence_id:null,essence_table:null},{createdAt:{[Op.lt]:Date.now()-3600000}}]}}).then(fileArr=>{
                return fileArr.map(file=>{
                    return file.dataValues.file_path;
                })
            });
            await File.destroy({where:{[Op.or]:[{essence_id:null,essence_table:null},{createdAt:{[Op.lt]:Date.now()-3600000}}]}});
            await this.removeFileLocal(filePathes);
        } catch (error) {
            throw error;
        }
    }

    async createPathForSave(foulder: string, file_name: string) {
        try {
            if (!foulder || !file_name) {
                throw new BadRequestException("Ошибка создания пути файла")
            }
            return resolve(process.cwd(), foulder, file_name);
        } catch (error) {
            throw error;
        }

    }

    async createFileName(format: string) {
        try {
            const formats = ["jpg", "jpeg", "png"];
            if (!formats.includes(format)) {
                throw new BadRequestException("Ошибка формата, только .jpg и .png")
            }
            return sha256(Date.now().toString()) + `.${format}`;
        } catch (error) {
            throw error;
        }

    }

    async writeFileLocal(file: FileNewDto) {
        try {
            if (!file) {
                throw new BadRequestException("Отсутствуют данные")
            }

            writeFile(file.file_path, file.file_buffer, (err) => {
                if (err) { throw err }
            });
            return file;
        } catch (error) {
            throw error;
        }
    }

    async removeFileLocal(file_path: string[]) {
        try {
            if(!file_path.length){
                throw new BadRequestException("Ошибка удаления данных")
            }
            file_path.forEach(file=>{
                rimraf(file)
            })
        } catch (error) {
            throw error;
        }
    }

    async saveFileInDb(file: FileNewDto) {
        try {
            if (!file) {
                throw new BadRequestException("Отсутствуют данные")
            }
            if (!File.findOne({ where: { file_name: file.file_name } })) {
                throw new BadRequestException("Файл уже существует")
            }
            await File.create(file)
        } catch (error) {
            throw error;
        }
    }

    async removeFileInDb(dto: FileDto) {
        try {
            const filePathes = await File.findAll({where:{...dto}}).then(fileArr=>{
                return fileArr.map(file=>{
                    return file.dataValues.file_path;
                })
            });
            await File.destroy({where:{...dto}})
            return filePathes
        } catch (error) {
            throw error;
        }
    }

    async onBlockRemove(){
        try {
            const blockFiles = await File.findAll({where:{essence_id:null}})
            if(blockFiles){
                blockFiles.forEach(async file=>{
                    await file.set({essence_table:null}).save()
                })
            }
        } catch (error) {
            throw error;
        }
    }

    async onTextBlockUpdate(dto:FileDto,files: Array<Express.Multer.File>) {
        try {
            await this.removeFileInDb(dto).then(async filePath=>{
                await this.removeFileLocal(filePath);
            })
            await this.fileCreate(files,dto)
        } catch (error) {
            throw error;
        }
    }

    async onTextBlockGet(block_id:number){
        try {
            return await File.findAll({where:{essence_id:block_id},attributes:["id","file_path","essence_id"]})
        } catch (error) {
            throw error;
        }
    }
}
