import { Controller, Post, Headers, Delete, Param, BadRequestException, Patch, Body, ValidationPipe } from '@nestjs/common';
import { ProfileService} from './profile.service';
import { UserProfileDto } from './dto/user.profile.dto';
import { AuthTokenService } from 'modules/auth-token/auth-token.service';
import { UserRole } from 'enums';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
        private readonly tokenService: AuthTokenService
    ) { }

    @Post()
    async userProfileCreate(@Headers("Authorization") token:string, @Body(new ValidationPipe()) dto: UserProfileDto) {
        const bearerToken = token.split(" ")[1];
        if(!bearerToken){
            throw new BadRequestException("Ошибка авторизации");
        }
        const userData = await this.tokenService.tokenAccessValidate(bearerToken);
        if(!userData){
            throw new BadRequestException("Ошибка авторизации");
        }
        if(userData.role == UserRole.ADMIN){
            return this.profileService.userProfileCreate(dto);
        }else { 
            if(+dto.user_id !== +userData.user_id){
                throw new BadRequestException("Что то пошло не так")
            }
            return this.profileService.userProfileCreate(dto);
        }
        
    }

    @Patch()
    async userProfileUpdate(@Headers("Authorization") token:string, @Body(new ValidationPipe()) dto: UserProfileDto) {
        const bearerToken = token.split(" ")[1];
        if(!bearerToken){
            throw new BadRequestException("Ошибка авторизации");
        }
        const userData = await this.tokenService.tokenAccessValidate(bearerToken);
        if(!userData){
            throw new BadRequestException("Ошибка авторизации");
        }
        if(userData.role == "ADMIN"){
            return this.profileService.userProfileUpdate(dto);
        }else { 
            if(+dto.user_id !== +userData.user_id){
                throw new BadRequestException("Что то пошло не так")
            }
            return this.profileService.userProfileUpdate(dto);
        }
    }

    @Delete(":user_id")
    async userProfileDelete(@Headers("Authorization") token:string, @Param("user_id") user_id:number) {
        const bearerToken = token.split(" ")[1];
        if(!bearerToken){
            throw new BadRequestException("Ошибка авторизации");
        }
        const userData = await this.tokenService.tokenAccessValidate(bearerToken);
        if(!userData){
            throw new BadRequestException("Ошибка авторизации");
        }
        if(userData.role == "ADMIN"){
            return this.profileService.userProfileDelete(user_id);
        }else { 
            if(+user_id !== +userData.user_id){
                throw new BadRequestException("Что то пошло не так")
            }
            return this.profileService.userProfileDelete(user_id);
        }
    }
    
}

