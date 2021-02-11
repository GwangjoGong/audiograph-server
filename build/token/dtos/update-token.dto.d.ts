import { CoreOutput } from '../../common/dtos/output.dto';
import { CreateTokenInput } from './create-token.dto';
declare const UpdateTokenInput_base: import("@nestjs/common").Type<Partial<CreateTokenInput>>;
export declare class UpdateTokenInput extends UpdateTokenInput_base {
    tokenId: number;
}
export declare class UpdateTokenOutput extends CoreOutput {
}
export {};
