import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HtsService } from '../hts/hts.service';
import { JwtService } from '../jwt/jwt.service';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly htsService: HtsService,
    private readonly jwtService: JwtService,
  ) {}

  async userProfile(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOneOrFail({ id });

      return {
        ok: true,
        user,
      };
    } catch {
      return {
        ok: false,
        error: 'User not found',
      };
    }
  }

  async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const existingUser = await this.users.findOne({
        email: createAccountInput.email,
      });
      if (existingUser) {
        return {
          ok: true,
        };
      }

      const {
        ok,
        error,
        htsAccountId,
        privateKey,
      } = await this.htsService.createHtsAccount();
      if (!ok) {
        return {
          ok,
          error,
        };
      }

      await this.users.save(
        this.users.create({
          ...createAccountInput,
          htsAccountId,
          privateKey,
        }),
      );
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot create account',
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne(
        { email },
        { select: ['id', 'password'] },
      );
      if (!user) {
        return {
          ok: false,
          error: "Couldn't find user",
        };
      }

      const correct = await user.checkPassword(password);
      if (!correct) {
        return {
          ok: false,
          error: 'Check your email and password',
        };
      }

      const token = this.jwtService.sign(user.id);

      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
