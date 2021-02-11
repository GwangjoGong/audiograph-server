import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsNumber } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { Music } from '../../music/entities/music.entity';

@InputType('InvestmentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Investment extends CoreEntity {
  @Column()
  @Field(is => Number)
  @IsNumber()
  amount: number;

  @Column()
  @Field(is => Number)
  @IsNumber()
  price: number;

  @ManyToOne(
    to => User,
    user => user.investments,
    { onDelete: 'CASCADE' },
  )
  @Field(is => User)
  user: User;

  @ManyToOne(
    to => Music,
    music => music.investments,
    { onDelete: 'CASCADE', eager: true },
  )
  @Field(is => Music)
  music: Music;
}
