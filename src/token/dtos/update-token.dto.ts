import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';
import { CreateTokenInput } from './create-token.dto';

@InputType()
export class UpdateTokenInput extends PartialType(CreateTokenInput) {
  @Field(is => Number)
  @IsNumber()
  tokenId: number;
}

@ObjectType()
export class UpdateTokenOutput extends CoreOutput {}
