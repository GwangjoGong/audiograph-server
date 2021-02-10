import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';
import { CreateMusicInput } from './create-music.dto';

@InputType()
export class UpdateMusicInput extends PartialType(CreateMusicInput) {
  @Field(is => Number)
  id: number;
}

@ObjectType()
export class UpdateMusicOutput extends CoreOutput {}
