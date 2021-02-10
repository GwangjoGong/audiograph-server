import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Music } from '../entities/music.entity';

@ObjectType()
export class GetAllMusicsOutput extends CoreOutput {
  @Field(is => [Music], { nullable: true })
  musics?: Music[];
}
