import { BadRequestException, Injectable } from '@nestjs/common';
import { Profile } from 'models/profiles.model';
import { UserProfileDto } from './dto/user.profile.dto';

@Injectable()
export class ProfileService {
  async userProfileCreate(dto: UserProfileDto) {
    try {
      const { user_id } = dto;
      if (await Profile.findOne({ where: { user_id } })) {
        throw new BadRequestException("Профиль для данного пользоателя уже существует");
      }
      await Profile.create(dto);
    } catch (error) {
      throw error;
    }
  }

  async userProfileDelete(user_id: number) {
    try {
      if (!await Profile.findOne({ where: { user_id } })) {
        throw new BadRequestException("Профиль не найден");
      }
      await Profile.destroy({ where: { user_id } })
    } catch (error) {
      throw error;
    }
  }

  async userProfileUpdate(dto: UserProfileDto) {
    try {
      const { user_id } = dto;
      const profile = await Profile.findOne({ where: { user_id } });
      if (!profile) {
        throw new BadRequestException("Профиль не найден");
      }
      await profile.set(dto).save()
    } catch (error) {
      throw error;
    }
  }

}
