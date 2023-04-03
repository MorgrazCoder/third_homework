import { IsString,IsPhoneNumber,IsNotEmpty, IsEmail,IsStrongPassword } from 'class-validator';

export class UserRegistrationDto {
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
    @IsNotEmpty()
    @IsString()
    public readonly first_name: string;
    @IsNotEmpty()
    @IsString()
    public readonly last_name: string;
    @IsNotEmpty()
    @IsPhoneNumber()
    public readonly phone_number: string;
}