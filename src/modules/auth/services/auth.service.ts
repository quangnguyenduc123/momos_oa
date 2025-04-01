import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { username } });
        if (user) {
            const match = await bcrypt.compare(password, user.hashPassword);
            console.log('match', match);
            if (match) return user;
        };
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: User): Promise<String> {
        const payload = { userId: user.id };
        return this.jwtService.sign(payload);
    }

}