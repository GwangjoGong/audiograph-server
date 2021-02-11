import { Repository } from 'typeorm';
import { HtsService } from '../hts/hts.service';
import { CreateTokenInput, CreateTokenOutput } from './dtos/create-token.dto';
import { GetAllTokensOutput } from './dtos/get-all-tokens.dto';
import { GetTokenInput, GetTokenOutput } from './dtos/get-token.dto';
import { UpdateTokenInput, UpdateTokenOutput } from './dtos/update-token.dto';
import { Token } from './entities/token.entity';
export declare class TokenService {
    private readonly tokenRepository;
    private readonly htsService;
    constructor(tokenRepository: Repository<Token>, htsService: HtsService);
    createToken(createTokenInput: CreateTokenInput): Promise<CreateTokenOutput>;
    getAllTokens(): Promise<GetAllTokensOutput>;
    getToken({ id }: GetTokenInput): Promise<GetTokenOutput>;
    updateToken(updateTokenInput: UpdateTokenInput): Promise<UpdateTokenOutput>;
    makeEarning(): Promise<void>;
    changePrice(): Promise<void>;
    checkAllTokenLogs(): Promise<void>;
}
