import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';

@ObjectType()
export class CreateHtsTokenOutput extends CoreOutput {
  @Field(is => String, { nullable: true })
  htsTokenId?: string;
}
