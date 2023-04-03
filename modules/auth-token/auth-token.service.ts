import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokensGenerateDto } from 'modules/auth-token/dto/tokens.generate.dto';
import { Token } from 'models/tokens.model';

@Injectable()
export class AuthTokenService {
  constructor(
    private readonly jwtService: JwtService
  ) { }
  async tokensGenerate(dto: TokensGenerateDto) {
    const accessToken = await this.jwtService.signAsync(dto, { expiresIn: '15m', secret: process.env.JWT_ACCESS_SECRET_KEY });
    const refreshToken = await this.jwtService.signAsync(dto, { expiresIn: '30d', secret: process.env.JWT_REFRESH_SECRET_KEY });
    return { accessToken, refreshToken }
  }

  async tokensRefresh(refresh_token: string) {
    const userData = await this.tokenRefreshValidate(refresh_token)
    const tokenFromDb = Token.findOne({ where: { refresh_token } })
    if (!tokenFromDb || !userData) {
      throw new BadRequestException("Пользователь не авторизован");
    }
    const { user_id, role } = userData;
    const tokens = await this.tokensGenerate({ user_id, role });
    await this.tokenSave(user_id, tokens.refreshToken);
    return tokens;
  }

  async tokenAccessValidate(access_token: string) {
    try {
      return this.jwtService.verifyAsync(access_token, { secret: process.env.JWT_ACCESS_SECRET_KEY })
    } catch (error) {
      return null
    }
  }

  async tokenRefreshValidate(refresh_token: string) {
    try {
      return this.jwtService.verifyAsync(refresh_token, { secret: process.env.JWT_REFRESH_SECRET_KEY })
    } catch (error) {
      return null
    }
  }

  async tokenSave(user_id: number, refresh_token: string) {
    try {
      await Token.upsert({ user_id, refresh_token });
    } catch (error) {
      return null
    }
  }

  async tokenRemove(refresh_token: string) {
    try {
      await Token.destroy({ where: { refresh_token } });
    } catch (error) {
      return null
    }
  }
}