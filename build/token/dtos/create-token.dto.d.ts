import { CoreOutput } from '../../common/dtos/output.dto';
import { Token } from '../entities/token.entity';
declare const CreateTokenInput_base: import("@nestjs/common").Type<Pick<Token, "status" | "initialPrice" | "totalStock" | "recentPrice" | "stock" | "logs">>;
export declare class CreateTokenInput extends CreateTokenInput_base {
    title: string;
}
export declare class CreateTokenOutput extends CoreOutput {
    token?: Token;
}
export {};
