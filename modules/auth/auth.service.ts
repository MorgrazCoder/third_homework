import { BadRequestException, Injectable} from '@nestjs/common';
import { ProfileService } from 'modules/profile/profile.service';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegistrationDto } from './dto/user.reg.dto';
import { UserProfileDto } from 'modules/profile/dto/user.profile.dto';
import { User } from 'models/users.model';
import { sha256 } from 'js-sha256';
import { UserRole } from 'enums';
import { AuthTokenService } from '../auth-token/auth-token.service';

require('dotenv').config();

@Injectable()
export class LoginService {
  constructor(
    private readonly tokenService:AuthTokenService
  ){}
  async userLogin(dto: UserLoginDto) {
    try {
      const person = await User.findOne({ where: { email: dto.email } })
      
      if (!person){
        console.log("Пользователеь не найден");
        throw new BadRequestException("Пользователь не найден")
      }
      if(sha256(dto.password)!==person.dataValues.password){
        console.log("Пароль не верный")
        throw new BadRequestException("Пароль не верный") 
      }
      const {id,role} = person.dataValues;
      const tokens = await this.tokenService.tokensGenerate({user_id:id,role});
      await this.tokenService.tokenSave(id,tokens.refreshToken);
      return tokens;
      
    } catch (error) {
      throw error;
    }
  }

  async userLogout(refresh_token:string){
    return this.tokenService.tokenRemove(refresh_token);
  }

}

@Injectable()
export class RegistrationService {
  constructor(
    private readonly profileService: ProfileService
  ) { }

  async userRegistration(dto: UserRegistrationDto): Promise<UserRegistrationDto> { //реегистрация пользователя
    const { email, password, first_name, last_name, phone_number } = dto;
    try {
      if (await User.findOne({ where: { email: email } })) {
        throw new BadRequestException("Пользователь с текущим email уже зарегистрирован") 
      }
      const newUser = await User.create({ email, password: sha256(password), role: UserRole.USER })
      const dtoProfile: UserProfileDto = { first_name, last_name, phone_number, user_id: newUser.dataValues.id }
      this.profileService.userProfileCreate(dtoProfile)//вызов метода на создание профиля
      return dto;
    } catch (error) {
      throw error;
    }
    return dto;
  }

}


