import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';

import { CoreOutput } from '../../common/dtos/output.dto';

import { Token } from '../entities/token.entity';

@InputType()
export class CreateTokenInput extends OmitType(Token, [
  'id',
  'createdAt',
  'updatedAt',
  'htsTokenId',
]) {
  @Field(is => String)
  title: string;
}

@ObjectType()
export class CreateTokenOutput extends CoreOutput {
  @Field(is => Token, { nullable: true })
  token?: Token;
}
