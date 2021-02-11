import { GetAccountBalanceOutput } from '../hts/dtos/get-account-balance.dto';
import { GetTokenBalanceOutput } from '../hts/dtos/get-token-balance.dto';
import { HtsService } from '../hts/hts.service';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    private readonly htsService;
    constructor(userService: UserService, htsService: HtsService);
    me(user: User): User;
    getAccountBalance(user: User): Promise<GetAccountBalanceOutput>;
    getTokenBalance(user: User): Promise<GetTokenBalanceOutput>;
    userProfile({ id }: UserProfileInput): Promise<UserProfileOutput>;
    login(loginInput: LoginInput): Promise<LoginOutput>;
    createAccount(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>;
}
