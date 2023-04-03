import { Controller, Post, Res, Req } from '@nestjs/common';
import { Body, Get} from '@nestjs/common/decorators';
import { LoginService, RegistrationService } from './auth.service';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegistrationDto } from './dto/user.reg.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Response,Request } from 'express';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginService: LoginService,
        private readonly registrationService: RegistrationService
    ) { }

    @Post("/login")
    async userLogin(@Res({ passthrough: true }) response: Response, @Body(new ValidationPipe()) dto: UserLoginDto) {
        const tokens = await this.loginService.userLogin(dto);
        response.cookie('refresh_token', tokens.refreshToken, { httpOnly: true, maxAge: 60 * 1000 * 60 * 24 * 30 });
        return tokens;
    }

    @Get("/logout")
    async userLogout(@Res({ passthrough: true }) response: Response,@Req() request:Request) {
        const {refresh_token} = request.cookies
        await this.loginService.userLogout(refresh_token);
        response.clearCookie('refresh_token');
    }

    @Post("/reg")
    async userRegistration(@Body(new ValidationPipe()) dto: UserRegistrationDto): Promise<UserRegistrationDto> {
        return this.registrationService.userRegistration(dto);
    }

}

