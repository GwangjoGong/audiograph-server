import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicModule } from '../music/music.module';
import { TokenModule } from '../token/token.module';

import { Investment } from './entities/investment.entity';
import { InvestmentResolver } from './investment.resolver';
import { InvestmentService } from './investment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Investment]), MusicModule, TokenModule],
  providers: [InvestmentService, InvestmentResolver],
})
export class InvestmentModule {}
