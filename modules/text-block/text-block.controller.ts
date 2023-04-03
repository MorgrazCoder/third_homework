import { Controller, Get, Post, Patch, Delete, Headers, Param, UseInterceptors, BadRequestException, Body, ValidationPipe, UploadedFiles } from '@nestjs/common';
import { TextBlockService } from './text-block.service';
import { UserRole } from 'enums';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthTokenService } from 'modules/auth-token/auth-token.service';
import { TextBlockDto } from './dto/text.block.dto';

@Controller("block")
export class TextBlockController {
    constructor(
        private readonly textBlockService: TextBlockService,
        private readonly tokenService: AuthTokenService
    ) { }

    @Post()
    @UseInterceptors(FilesInterceptor('image', 20))
    async textBlockCreate(@Headers("Authorization") token: string, @UploadedFiles() files: Array<Express.Multer.File>, @Body(new ValidationPipe()) dto: TextBlockDto) {
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            throw new BadRequestException("Ошибка авторизации");
        }
        const userData = await this.tokenService.tokenAccessValidate(bearerToken);
        if (!userData || !(userData.role == UserRole.ADMIN) || !files.length) {
            throw new BadRequestException("Ошибка авторизации");
        }
        return await this.textBlockService.textBlockCreate(files, dto)
    }

    @Delete(":block_id")
    async textBlockRemove(@Headers("Authorization") token: string, @Param("block_id") block_id: number) {
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            throw new BadRequestException("Ошибка авторизации");
        }
        const userData = await this.tokenService.tokenAccessValidate(bearerToken);
        if (!userData || !(userData.role == UserRole.ADMIN)) {
            throw new BadRequestException("Ошибка авторизации");
        }
        return await this.textBlockService.textBlockRemove(block_id);


    }

    @Patch(":block_id")
    @UseInterceptors(FilesInterceptor('image', 20))
    async textBlockUpdate(@Headers("Authorization") token: string, @UploadedFiles() files: Array<Express.Multer.File>, @Param("block_id") block_id: number, @Body(new ValidationPipe()) dto: TextBlockDto) {
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            throw new BadRequestException("Ошибка авторизации");
        }
        const userData = await this.tokenService.tokenAccessValidate(bearerToken);
        if (!userData || !(userData.role == UserRole.ADMIN)) {
            throw new BadRequestException("Ошибка авторизации");
        }
        return await this.textBlockService.textBlockUpdate(block_id, dto, files);

    }

    @Get(":bygroup")
    async textBlocksGetByGroup(@Headers("Authorization") token: string,@Param("bygroup") bygroup:string) {
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            throw new BadRequestException("Ошибка авторизации");
        }
        const userData = await this.tokenService.tokenAccessValidate(bearerToken);
        if (!userData || !(userData.role == UserRole.ADMIN)) {
            throw new BadRequestException("Ошибка авторизации");
        }
        return await this.textBlockService.textBlocksGet(bygroup);
    }

    @Get()
    async textBlockGetAll(@Headers("Authorization") token: string) {
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            throw new BadRequestException("Ошибка авторизации");
        }
        const userData = await this.tokenService.tokenAccessValidate(bearerToken);
        if (!userData || !(userData.role == UserRole.ADMIN)) {
            throw new BadRequestException("Ошибка авторизации");
        }
        return await this.textBlockService.textBlocksGet()
    }




}
