import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Music } from '../entities/music.entity';

@InputType()
export class GetMusicInput {
  @Field(is => Number)
  @IsNumber()
  id: number;
}

@ObjectType()
export class GetMusicOutput extends CoreOutput {
  @Field(is => Music, { nullable: true })
  music?: Music;
}
