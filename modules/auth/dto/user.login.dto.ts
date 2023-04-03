import { IsNotEmpty,IsEmail,IsStrongPassword } from 'class-validator';

export class UserLoginDto {
    @IsNotEmpty()
    @IsEmail()
    public readonly email: string;
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 9,
        minLowercase: 3,
        minUppercase: 3,
        minNumbers: 1,
        minSymbols: 0
    })
    public readonly password: string;
}