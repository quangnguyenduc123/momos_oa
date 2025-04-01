import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto/login.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async login(@Body() loginDto: LoginDTO) {
        const { username, password } = loginDto
        const user = await this.authService.validateUser(username, password);
        const accessToken = await this.authService.login(user);
        return {
            accessToken,
        }
    }
}