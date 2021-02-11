import { CoreOutput } from '../../common/dtos/output.dto';
import { Investment } from '../entities/investment.entity';
declare const CreateInvestmentInput_base: import("@nestjs/common").Type<Pick<Investment, "amount">>;
export declare class CreateInvestmentInput extends CreateInvestmentInput_base {
    musicId: number;
}
export declare class CreateInvestmentOutput extends CoreOutput {
}
export {};
