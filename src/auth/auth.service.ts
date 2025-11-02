import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {


    constructor(private prisma: PrismaService, private jwtService: JwtService) { }


    async register(data: RegisterDto) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        try {
            if (data.role === 'ADMIN') {
                const existingAdmin = await this.prisma.user.findFirst({ where: { role: 'ADMIN' } });
                if (existingAdmin) {
                    throw new UnauthorizedException('Ya existe un administrador registrado');
                }
            }
            return this.prisma.user.create({
                data: {
                    email: data.email,
                    username: data.username,
                    password: hashedPassword,
                    role: data.role || 'USER',
                },
            })
        } catch (error) {
            if (error.code === 'P2002') {
                throw new UnauthorizedException('El usuario o correo ya existe');
            }
            throw error;
        }
    }


    async validateUser(username: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (!user) throw new UnauthorizedException('Email no encontrado');

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new UnauthorizedException('Contraseña incorrecta');
        return user;
    }
    async login(user: LoginDto) {
        const validUser = await this.validateUser(user.username, user.password);
        const payload = { sub: validUser.id, username: validUser.username, role: validUser.role };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}


