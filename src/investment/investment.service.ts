import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HtsService } from '../hts/hts.service';
import { MusicService } from '../music/music.service';
import { TokenStatus } from '../token/entities/token.entity';
import { TokenService } from '../token/token.service';
import { User } from '../user/entities/user.entity';
import {
  CreateInvestmentInput,
  CreateInvestmentOutput,
} from './dtos/create-investment.dto';
import { Investment } from './entities/investment.entity';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,
    private readonly musicService: MusicService,
    private readonly tokenService: TokenService,
    private readonly htsService: HtsService,
  ) {}

  async createInvestment(
    user: User,
    createInvestmentInput: CreateInvestmentInput,
  ): Promise<CreateInvestmentOutput> {
    try {
      const { ok, error, music } = await this.musicService.getMusic({
        id: createInvestmentInput.musicId,
      });
      if (!ok) {
        return {
          ok,
          error,
        };
      }

      if (music.token.stock < createInvestmentInput.amount) {
        return {
          ok: false,
          error: 'Cannot invest more than available stock number',
        };
      }

      const associateTokenResult = await this.htsService.assoicateHtsToken(
        music.token.htsTokenId,
        user.htsAccountId,
        user.privateKey,
      );

      if (!associateTokenResult.ok) {
        return {
          ok: false,
          error: associateTokenResult.error,
        };
      }

      const transferTokenResult = await this.htsService.transferHtsToken(
        music.token.htsTokenId,
        user.htsAccountId,
        createInvestmentInput.amount,
      );
      if (!transferTokenResult.ok) {
        return {
          ok: false,
          error: transferTokenResult.error,
        };
      }

      const transferHbarResult = await this.htsService.transferHbarToAdmin(
        user.htsAccountId,
        createInvestmentInput.amount * music.token.initialPrice,
        user.privateKey,
      );
      if (!transferHbarResult.ok) {
        return {
          ok: false,
          error: transferHbarResult.error,
        };
      }

      await this.investmentRepository.save(
        this.investmentRepository.create({
          user,
          music,
          amount: createInvestmentInput.amount,
          price: music.token.initialPrice,
        }),
      );

      const leftStock = music.token.stock - createInvestmentInput.amount;

      await this.tokenService.updateToken({
        tokenId: music.token.id,
        stock: leftStock,
      });

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot create investment',
      };
    }
  }

  async checkInvestment() {
    try {
      const investments = await this.investmentRepository.find();
      const targetInvestments = investments.filter(
        i => i.music.token.status === TokenStatus.Open,
      );

      for (const investment of targetInvestments) {
        const holder = investment.user;
        const token = investment.music.token;
        const uncheckedLogs = token.logs.filter(l => !l.checked);
        const totalEarnings = uncheckedLogs.reduce(
          (acc, val) => acc + val.copyrightFee,
          0,
        );

        await this.htsService.transferHbarToUser(
          holder.htsAccountId,
          totalEarnings,
        );
      }

      await this.tokenService.checkAllTokenLogs();
    } catch (error) {
      console.error(error);
    }
  }
}
