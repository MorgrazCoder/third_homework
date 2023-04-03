import { Controller, Post, Headers, Delete, Param, BadRequestException, Body, ValidationPipe, UseInterceptors, UploadedFiles, Get } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/file.dto';
import { FileService } from './file.service';
import { AuthTokenService } from 'modules/auth-token/auth-token.service';
import { UserRole } from 'enums';

@Controller('file')
export class FileController {
    constructor(
        private readonly fileService: FileService,
        private readonly tokenService: AuthTokenService
    ) { }

    @Post()
    @UseInterceptors(FilesInterceptor('image', 20))
    async fileCreate(@Headers("Authorization") token: string, @UploadedFiles() files: Array<Express.Multer.File>, @Body(new ValidationPipe()) dto: FileDto) {
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            throw new BadRequestException("Ошибка авторизации");
        }
        const userData = await this.tokenService.tokenAccessValidate(bearerToken);
        if (!userData || !(userData.role == UserRole.ADMIN)) {
            throw new BadRequestException("Ошибка авторизации");
        }
        if (!files.length || !dto) {
            throw new BadRequestException("Отсутствуют данные")
        }
        return this.fileService.fileCreate(files, dto)
    }

    @Delete()
    async filesRemove(@Headers("Authorization") token: string) {
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            throw new BadRequestException("Ошибка авторизации");
        }
        const userData = await this.tokenService.tokenAccessValidate(bearerToken);
        if (!userData || !(userData.role == UserRole.ADMIN)) {
            throw new BadRequestException("Ошибка авторизации");
        }
        this.fileService.removeAllByActivity()
    }

    @Get(":block_id")
    async filesGet(@Headers("Authorization") token: string, @Param("block_id") block_id:number) {
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            throw new BadRequestException("Ошибка авторизации");
        }
        const userData = await this.tokenService.tokenAccessValidate(bearerToken);
        if (!userData || !(userData.role == UserRole.ADMIN)) {
            throw new BadRequestException("Ошибка авторизации");
        }
        return await this.fileService.onTextBlockGet(block_id);
    }
}
