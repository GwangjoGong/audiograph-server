import { Field } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';

export class CreateHtsAccountOutput extends CoreOutput {
  @Field(is => String, { nullable: true })
  htsAccountId?: string;
}
