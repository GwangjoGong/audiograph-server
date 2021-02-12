import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from './entities/music.entity';
import { CreateMusicInput, CreateMusicOutput } from './dtos/create-music.dto';
import { UpdateMusicInput, UpdateMusicOutput } from './dtos/update-music.dto';
import { GetMusicInput, GetMusicOutput } from './dtos/get-music.dto';
import { GetAllMusicsOutput } from './dtos/get-all-musics.dto';
import { TokenService } from '../token/token.service';
import { TokenStatus } from '../token/entities/token.entity';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
    private readonly tokenService: TokenService,
  ) {}

  async createMusic(
    createMusicInput: CreateMusicInput,
  ): Promise<CreateMusicOutput> {
    try {
      const { ok, error, token } = await this.tokenService.createToken({
        title: createMusicInput.title,
        initialPrice: createMusicInput.initialPrice,
        totalStock: createMusicInput.totalStock,
        status: TokenStatus.Investing,
        logs: [],
      });

      if (!ok) {
        return {
          ok,
          error,
        };
      }

      await this.musicRepository.save(
        this.musicRepository.create({
          token,
          ...createMusicInput,
        }),
      );

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot create music',
      };
    }
  }

  async updateMusic(
    updateMusicInput: UpdateMusicInput,
  ): Promise<UpdateMusicOutput> {
    try {
      await this.musicRepository.findOneOrFail({ id: updateMusicInput.id });

      await this.musicRepository.update(
        { id: updateMusicInput.id },
        { ...updateMusicInput },
      );

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot update music',
      };
    }
  }

  async getMusic(getMusicInput: GetMusicInput): Promise<GetMusicOutput> {
    try {
      const music = await this.musicRepository.findOneOrFail({
        id: getMusicInput.id,
      });
      return {
        ok: true,
        music,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot get music',
      };
    }
  }

  async getAllMusics(): Promise<GetAllMusicsOutput> {
    try {
      const musics = await this.musicRepository.find();
      return {
        ok: true,
        musics,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot get all musics',
      };
    }
  }

  async getTrendingMusics(): Promise<GetAllMusicsOutput> {
    try {
      const musics = await this.musicRepository.find({
        relations: ['token'],
      });

      const sorted = musics.sort(
        (m1, m2) =>
          m1.token.stock / m1.token.totalStock -
          m2.token.stock / m2.token.totalStock,
      );

      return {
        ok: true,
        musics: sorted.slice(0, 3),
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot get all musics',
      };
    }
  }

  async getRecentMusics(): Promise<GetAllMusicsOutput> {
    try {
      const musics = await this.musicRepository.find({
        relations: ['token'],
        order: {
          createdAt: 'DESC',
        },
        take: 3,
      });

      return {
        ok: true,
        musics,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot get all musics',
      };
    }
  }
}
