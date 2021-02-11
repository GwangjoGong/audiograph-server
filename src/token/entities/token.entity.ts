import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum TokenStatus {
  Investing = 'Investing',
  Open = 'Open',
  Close = 'Close',
}

registerEnumType(TokenStatus, { name: 'TokenStatus' });

@InputType('TokenDailyLogInputType', { isAbstract: true })
@ObjectType()
export class TokenDailyLog {
  @Field(is => Date)
  date: Date;

  @Field(is => Number)
  diff: number;
}

@InputType('TokenInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Token extends CoreEntity {
  @Column()
  @Field(is => String)
  @IsString()
  htsTokenId: string;

  @Column()
  @Field(is => Number)
  @IsNumber()
  initialPrice: number;

  @Column({ nullable: true })
  @Field(is => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  recentPrice?: number;

  @Column({ nullable: true })
  @Field(is => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  stock?: number;

  @Column()
  @Field(is => Number)
  @IsNumber()
  totalStock: number;

  @Column({ type: 'enum', enum: TokenStatus, default: TokenStatus.Investing })
  @Field(is => TokenStatus, { defaultValue: TokenStatus.Investing })
  @IsEnum(TokenStatus)
  status: TokenStatus;

  @Field(is => [TokenDailyLog], { defaultValue: [] })
  @Column({ type: 'json', default: [] })
  logs: TokenDailyLog[];
}
