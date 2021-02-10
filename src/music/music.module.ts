import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { MusicResolver } from './music.resolver';
import { MusicService } from './music.service';

@Module({
  imports: [TypeOrmModule.forFeature([Music])],
  providers: [MusicService, MusicResolver],
})
export class MusicModule {}
