import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { HtsService } from '../hts/hts.service';

import { CreateTokenInput, CreateTokenOutput } from './dtos/create-token.dto';
import { GetAllTokensOutput } from './dtos/get-all-tokens.dto';
import { GetTokenInput, GetTokenOutput } from './dtos/get-token.dto';
import { UpdateTokenInput, UpdateTokenOutput } from './dtos/update-token.dto';
import { Token } from './entities/token.entity';

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
      await this.tokenRepository.update(
        { id: updateTokenInput.tokenId },
        { ...updateTokenInput },
      );
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot update token',
      };
    }
  }
}
