import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Token } from '../entities/token.entity';
@ObjectType()
export class GetAllTokensOutput extends CoreOutput {
  @Field(is => [Token], { nullable: true })
  tokens?: Token[];
}
