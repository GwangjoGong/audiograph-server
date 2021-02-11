import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokenResolver } from './token.resolver';
import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [TokenService, TokenResolver],
  exports: [TokenService],
})
export class TokenModule {}
