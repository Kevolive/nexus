import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

    @IsNotEmpty()   
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}