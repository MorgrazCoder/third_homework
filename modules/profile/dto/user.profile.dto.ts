import { IsString,IsPhoneNumber,IsNotEmpty, IsNumber } from 'class-validator';

export class UserProfileDto {
    @IsNotEmpty()
    @IsNumber()
    public readonly user_id: number;
    @IsNotEmpty()
    @IsString()
    public readonly first_name?: string;
    @IsNotEmpty()
    @IsString()
    public readonly last_name?: string;
    @IsNotEmpty()
    @IsPhoneNumber()
    public readonly phone_number?: string;
}