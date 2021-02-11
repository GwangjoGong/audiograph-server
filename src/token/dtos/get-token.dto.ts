import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Token } from '../entities/token.entity';

@InputType()
export class GetTokenInput {
  @Field(is => Number)
  @IsNumber()
  id: number;
}

@ObjectType()
export class GetTokenOutput extends CoreOutput {
  @Field(is => Token, { nullable: true })
  token?: Token;
}
