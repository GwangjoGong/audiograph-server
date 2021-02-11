import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Investment } from '../entities/investment.entity';

@InputType()
export class CreateInvestmentInput extends PickType(Investment, ['amount']) {
  @Field(is => Number)
  @IsNumber()
  musicId: number;
}

@ObjectType()
export class CreateInvestmentOutput extends CoreOutput {}
