import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    // ❌ Email ან Username უკვე არსებობს
    const existsEmail = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existsEmail) throw new BadRequestException('ამ ელ.ფოსტაზე უკვე არსებობს ანგარიში');

    const existsUsername = await this.userRepo.findOne({ where: { username: dto.username } });
    if (existsUsername) throw new BadRequestException('ეს მომხმარებლის სახელი უკვე დაკავებულია');

    // 🔒 პაროლის ჰეშირება
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashed });
    await this.userRepo.save(user);

    return { message: 'რეგისტრაცია წარმატებით დასრულდა!' };
  }

  async login(dto: LoginDto) {
    // მოძებნეთ მომხმარებელი ელ.ფოსტით ან სახელით
    const user = await this.userRepo.findOne({ 
      where: [{ email: dto.identifier }, { username: dto.identifier }] 
    });
    if (!user) throw new BadRequestException('ელ.ფოსტა ან პაროლი არასწორია');

    // პაროლის შემოწმება
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new BadRequestException('ელ.ფოსტა ან პაროლი არასწორია');

    // Token
    const token = this.jwtService.sign({ id: user.id });
    return { token, message: 'შესვლა წარმატებით შესრულდა!' };
  }
}
