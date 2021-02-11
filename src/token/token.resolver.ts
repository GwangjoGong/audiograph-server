import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { CreateTokenInput, CreateTokenOutput } from './dtos/create-token.dto';
import { GetAllTokensOutput } from './dtos/get-all-tokens.dto';
import { GetTokenInput, GetTokenOutput } from './dtos/get-token.dto';
import { UpdateTokenInput, UpdateTokenOutput } from './dtos/update-token.dto';
import { Token } from './entities/token.entity';
import { TokenService } from './token.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Resolver(of => Token)
export class TokenResolver {
  constructor(private readonly tokenSerivce: TokenService) {}

  @UseGuards(AuthGuard)
  @Query(returns => GetAllTokensOutput)
  getAllTokens() {
    return this.tokenSerivce.getAllTokens();
  }

  @UseGuards(AuthGuard)
  @Query(returns => GetTokenOutput)
  getToken(@Args('input') getTokenInput: GetTokenInput) {
    return this.tokenSerivce.getToken(getTokenInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => CreateTokenOutput)
  createToken(@Args('input') createTokenInput: CreateTokenInput) {
    return this.tokenSerivce.createToken(createTokenInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => UpdateTokenOutput)
  updateToken(@Args('input') updateTokenInput: UpdateTokenInput) {
    return this.tokenSerivce.updateToken(updateTokenInput);
  }

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  makeEarning() {
    this.tokenSerivce.makeEarning();
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  changePrice() {
    this.tokenSerivce.changePrice();
  }
}
