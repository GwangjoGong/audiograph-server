import { CoreOutput } from '../../common/dtos/output.dto';
import { Token } from '../entities/token.entity';
export declare class GetTokenInput {
    id: number;
}
export declare class GetTokenOutput extends CoreOutput {
    token?: Token;
}
