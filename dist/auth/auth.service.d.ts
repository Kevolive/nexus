import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: RegisterDto): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        role: string;
        createAt: Date;
    }>;
    validateUser(username: string, password: string): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        role: string;
        createAt: Date;
    }>;
    login(user: LoginDto): Promise<{
        access_token: string;
    }>;
}
