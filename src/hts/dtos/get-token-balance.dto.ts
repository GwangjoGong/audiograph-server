import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';

@ObjectType()
export class GetTokenBalanceOutput extends CoreOutput {
  @Field(is => String, { nullable: true })
  tokenBalance?: string;
}
