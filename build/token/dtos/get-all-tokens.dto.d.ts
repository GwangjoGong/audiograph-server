import { CoreOutput } from '../../common/dtos/output.dto';
import { Token } from '../entities/token.entity';
export declare class GetAllTokensOutput extends CoreOutput {
    tokens?: Token[];
}
