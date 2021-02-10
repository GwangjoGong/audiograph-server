import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from './entities/music.entity';
import { CreateMusicInput, CreateMusicOutput } from './dtos/create-music.dto';
import { UpdateMusicInput, UpdateMusicOutput } from './dtos/update-music.dto';
import { GetMusicInput, GetMusicOutput } from './dtos/get-music.dto';
import { GetAllMusicsOutput } from './dtos/get-all-musics.dto';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
  ) {}

  async createMusic(
    createMusicInput: CreateMusicInput,
  ): Promise<CreateMusicOutput> {
    try {
      await this.musicRepository.save(
        this.musicRepository.create(createMusicInput),
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
}
