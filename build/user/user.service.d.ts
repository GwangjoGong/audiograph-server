import { Repository } from 'typeorm';
import { HtsService } from '../hts/hts.service';
import { JwtService } from '../jwt/jwt.service';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly users;
    private readonly htsService;
    private readonly jwtService;
    constructor(users: Repository<User>, htsService: HtsService, jwtService: JwtService);
    userProfile(id: number): Promise<UserProfileOutput>;
    createAccount(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>;
    login({ email, password }: LoginInput): Promise<LoginOutput>;
}
