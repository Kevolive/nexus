import { IsEmail, IsIn, IsNotEmpty, IsOptional, MinLength } from "class-validator";


export class RegisterDto {

    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @MinLength(6)   
    password: string;

    @IsOptional()
    @IsIn(['USER', 'ADMIN'])
    role?:'USER' | 'ADMIN';
}