import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { IsArray, IsISO8601, IsOptional, IsString } from 'class-validator';
import { Token } from '../../token/entities/token.entity';
import { Investment } from '../../investment/entities/investment.entity';

@InputType('MusicInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Music extends CoreEntity {
  @Column()
  @Field(is => String)
  @IsString()
  title: string;

  @Column()
  @Field(is => String)
  @IsString()
  coverImage: string;

  @Column()
  @Field(is => String)
  @IsString()
  sourceUrl: string;

  @Column('text', { array: true })
  @Field(is => [String])
  @IsArray()
  artist: string[];

  @Column('text', { array: true, nullable: true })
  @Field(is => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  composer?: string[];

  @Column('text', { array: true, nullable: true })
  @Field(is => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  arranger?: string[];

  @Column('text', { array: true, nullable: true })
  @Field(is => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  lyricist?: string[];

  @Column({ nullable: true })
  @Field(is => String, { nullable: true })
  @IsString()
  @IsOptional()
  copyrightPeriod?: string;

  @Column({ nullable: true })
  @Field(is => String, { nullable: true })
  @IsString()
  @IsOptional()
  copyrightTrust?: string;

  @Column({ nullable: true })
  @Field(is => String, { nullable: true })
  @IsString()
  @IsOptional()
  representativeTrustee?: string;

  @Column({ nullable: true })
  @Field(is => String, { nullable: true })
  @IsString()
  @IsOptional()
  caution?: string;

  @Column({ nullable: true })
  @Field(is => Date, { nullable: true })
  @IsOptional()
  publishDate?: Date;

  @OneToOne(to => Token, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  @Field(is => Token)
  token: Token;

  @OneToMany(
    to => Investment,
    investment => investment.music,
  )
  @Field(is => [Investment], { defaultValue: [] })
  investments: Investment[];
}
