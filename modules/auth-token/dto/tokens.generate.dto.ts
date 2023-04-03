import { IsNumber,IsNotEmpty, IsString, IsEnum} from 'class-validator';
import { UserRole } from 'enums';

export class TokensGenerateDto {
    @IsNotEmpty()
    @IsNumber()
    public readonly user_id: number;
    @IsString() 
    @IsEnum(UserRole)
    public readonly role: UserRole;
}