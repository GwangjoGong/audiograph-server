import { InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Music } from '../entities/music.entity';

@InputType()
export class CreateMusicInput extends OmitType(Music, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

@ObjectType()
export class CreateMusicOutput extends CoreOutput {}
