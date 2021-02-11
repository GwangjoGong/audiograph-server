import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { CreateMusicInput, CreateMusicOutput } from './dtos/create-music.dto';
import { GetAllMusicsOutput } from './dtos/get-all-musics.dto';
import { GetMusicInput, GetMusicOutput } from './dtos/get-music.dto';
import { UpdateMusicInput, UpdateMusicOutput } from './dtos/update-music.dto';
import { Music } from './entities/music.entity';
import { MusicService } from './music.service';

@Resolver(of => Music)
export class MusicResolver {
  constructor(private readonly musicService: MusicService) {}

  @UseGuards(AuthGuard)
  @Query(returns => GetAllMusicsOutput)
  getAllMusics() {
    return this.musicService.getAllMusics();
  }

  @UseGuards(AuthGuard)
  @Query(returns => GetAllMusicsOutput)
  getTrendingMusics() {
    return this.musicService.getTrendingMusics();
  }

  @UseGuards(AuthGuard)
  @Query(returns => GetAllMusicsOutput)
  getRecentMusics() {
    return this.musicService.getRecentMusics();
  }

  @UseGuards(AuthGuard)
  @Query(returns => GetMusicOutput)
  getMusic(@Args('input') getMusicInput: GetMusicInput) {
    return this.musicService.getMusic(getMusicInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => CreateMusicOutput)
  createMusic(@Args('input') createMusicInput: CreateMusicInput) {
    return this.musicService.createMusic(createMusicInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => UpdateMusicOutput)
  updateMusic(@Args('input') updateMusicInput: UpdateMusicInput) {
    return this.musicService.updateMusic(updateMusicInput);
  }
}
