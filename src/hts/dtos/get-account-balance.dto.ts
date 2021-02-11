import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';

@ObjectType()
export class GetAccountBalanceOutput extends CoreOutput {
  @Field(is => Number, { nullable: true })
  accountBalance?: number;
}
