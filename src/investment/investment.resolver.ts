import { UseGuards } from '@nestjs/common';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from '../auth/auth-user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../user/entities/user.entity';
import {
  CreateInvestmentInput,
  CreateInvestmentOutput,
} from './dtos/create-investment.dto';
import { Investment } from './entities/investment.entity';
import { InvestmentService } from './investment.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Resolver(of => Investment)
export class InvestmentResolver {
  constructor(private readonly investmentService: InvestmentService) {}

  @UseGuards(AuthGuard)
  @Mutation(returns => CreateInvestmentOutput)
  createInvestment(
    @AuthUser() user: User,
    @Args('input') createInvestmentInput: CreateInvestmentInput,
  ) {
    return this.investmentService.createInvestment(user, createInvestmentInput);
  }

  @UseGuards(AuthGuard)
  @Query(returns => [Investment])
  getMyInvestments(@AuthUser() user: User) {
    return user.investments;
  }

  @Cron(CronExpression.EVERY_WEEK)
  checkInvestments() {
    this.investmentService.checkInvestment();
  }
}
