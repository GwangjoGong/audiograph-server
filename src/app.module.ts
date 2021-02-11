import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { User } from './user/entities/user.entity';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { UserModule } from './user/user.module';
import { HtsModule } from './hts/hts.module';
import { MusicModule } from './music/music.module';
import { Music } from './music/entities/music.entity';
import { TokenModule } from './token/token.module';
import { InvestmentModule } from './investment/investment.module';
import { Investment } from './investment/entities/investment.entity';
import { Token } from './token/entities/token.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ user: req['user'] }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      logging: true,
      entities: [User, Music, Token, Investment],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    JwtModule.forRoot({
      privateKey: process.env.JWT_PRIVATE_KEY,
    }),
    HtsModule.forRoot({
      privateKey: process.env.HTS_PRIVATE_KEY,
      accountId: process.env.HTS_ACCOUNT_ID,
      publicKey: process.env.HTS_PUBLIC_KEY,
      key: process.env.JWT_PRIVATE_KEY,
      tbarTokenId: process.env.HTS_TBAR_TOKEN_ID,
    }),
    UserModule,
    MusicModule,
    TokenModule,
    InvestmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.ALL,
    });
  }
}
