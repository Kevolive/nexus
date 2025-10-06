import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authServise;
    constructor(authServise: AuthService);
    register(dto: RegisterDto): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        role: string;
        createAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
