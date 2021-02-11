import { CreateTokenInput, CreateTokenOutput } from './dtos/create-token.dto';
import { GetAllTokensOutput } from './dtos/get-all-tokens.dto';
import { GetTokenInput, GetTokenOutput } from './dtos/get-token.dto';
import { UpdateTokenInput, UpdateTokenOutput } from './dtos/update-token.dto';
import { TokenService } from './token.service';
export declare class TokenResolver {
    private readonly tokenSerivce;
    constructor(tokenSerivce: TokenService);
    getAllTokens(): Promise<GetAllTokensOutput>;
    getToken(getTokenInput: GetTokenInput): Promise<GetTokenOutput>;
    createToken(createTokenInput: CreateTokenInput): Promise<CreateTokenOutput>;
    updateToken(updateTokenInput: UpdateTokenInput): Promise<UpdateTokenOutput>;
    makeEarning(): void;
    changePrice(): void;
}
