import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from '../token/token.module';
import { Music } from './entities/music.entity';
import { MusicResolver } from './music.resolver';
import { MusicService } from './music.service';

@Module({
  imports: [TypeOrmModule.forFeature([Music]), TokenModule],
  providers: [MusicService, MusicResolver],
  exports: [MusicService],
})
export class MusicModule {}
