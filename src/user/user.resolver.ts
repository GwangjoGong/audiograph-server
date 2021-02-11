import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AuthUser } from '../auth/auth-user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { GetAccountBalanceOutput } from '../hts/dtos/get-account-balance.dto';
import { GetTokenBalanceOutput } from '../hts/dtos/get-token-balance.dto';
import { HtsService } from '../hts/hts.service';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly htsService: HtsService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(returns => User)
  me(@AuthUser() user: User) {
    return user;
  }

  @Query(returns => GetAccountBalanceOutput)
  getAccountBalance(@AuthUser() user: User) {
    return this.htsService.getAccountBalance(user.htsAccountId);
  }

  @Query(returns => GetTokenBalanceOutput)
  getTokenBalance(@AuthUser() user: User) {
    return this.htsService.getTokenBalance(user.htsAccountId);
  }

  @UseGuards(AuthGuard)
  @Query(returns => UserProfileOutput)
  userProfile(@Args() { id }: UserProfileInput): Promise<UserProfileOutput> {
    return this.userService.userProfile(id);
  }

  @Mutation(returns => LoginOutput)
  login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }

  @Mutation(returns => CreateAccountOutput)
  createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.userService.createAccount(createAccountInput);
  }
}
