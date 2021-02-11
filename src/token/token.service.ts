import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { HtsService } from '../hts/hts.service';

import { CreateTokenInput, CreateTokenOutput } from './dtos/create-token.dto';
import { GetAllTokensOutput } from './dtos/get-all-tokens.dto';
import { GetTokenInput, GetTokenOutput } from './dtos/get-token.dto';
import { UpdateTokenInput, UpdateTokenOutput } from './dtos/update-token.dto';
import { Token, TokenStatus } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly htsService: HtsService,
  ) {}

  async createToken(
    createTokenInput: CreateTokenInput,
  ): Promise<CreateTokenOutput> {
    try {
      const tokenResult = await this.htsService.createHtsToken(
        `${createTokenInput.title}Token`,
        `${createTokenInput.title}Symbol`,
        createTokenInput.totalStock,
      );

      if (!tokenResult.ok) {
        return {
          ok: false,
          error: tokenResult.error,
        };
      }

      const token = await this.tokenRepository.save(
        this.tokenRepository.create({
          ...createTokenInput,
          recentPrice: createTokenInput.initialPrice,
          stock: createTokenInput.totalStock,
          htsTokenId: tokenResult.htsTokenId,
        }),
      );

      return {
        ok: true,
        token,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot create token',
      };
    }
  }

  async getAllTokens(): Promise<GetAllTokensOutput> {
    try {
      const tokens = await this.tokenRepository.find();
      return {
        ok: true,
        tokens,
      };
    } catch (err) {
      console.log(err);
      return {
        ok: false,
        error: 'Cannot get all tokens',
      };
    }
  }

  async getToken({ id }: GetTokenInput): Promise<GetTokenOutput> {
    try {
      const token = await this.tokenRepository.findOneOrFail({ id });
      return {
        ok: true,
        token,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot get token',
      };
    }
  }

  async updateToken(
    updateTokenInput: UpdateTokenInput,
  ): Promise<UpdateTokenOutput> {
    try {
      const id = updateTokenInput.tokenId;
      delete updateTokenInput.tokenId;
      await this.tokenRepository.update({ id }, { ...updateTokenInput });
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot update token',
      };
    }
  }

  async makeEarning() {
    const openedTokens = await this.tokenRepository.find({
      status: TokenStatus.Open,
    });

    for (const token of openedTokens) {
      const randomEarning = 0.01 + Math.floor(Math.random() * 10) / 100;
      const newLog = {
        date: new Date(),
        copyrightFee: randomEarning,
        checked: false,
      };

      const logs = token.logs;
      token.logs = [...logs, newLog];

      await this.tokenRepository.save(token);
    }
  }

  async changePrice() {
    const openedTokens = await this.tokenRepository.find({
      status: TokenStatus.Open,
    });

    for (const token of openedTokens) {
      const recentPrice = token.recentPrice;
      const randomRatio = (-10 + Math.floor(Math.random() * 20)) / 1000;
      const newPrice = Math.floor(recentPrice * randomRatio);

      token.recentPrice = newPrice;

      await this.tokenRepository.save(token);
    }
  }

  async checkAllTokenLogs() {
    const openedTokens = await this.tokenRepository.find({
      status: TokenStatus.Open,
    });

    for (const token of openedTokens) {
      const logs = token.logs;
      for (const log of logs) {
        log.checked = true;
      }

      token.logs = logs;

      await this.tokenRepository.save(token);
    }
  }
}
