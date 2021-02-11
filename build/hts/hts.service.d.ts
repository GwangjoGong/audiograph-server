import { CreateHtsAccountOutput } from './dtos/create-hts-account.dto';
import { HtsModuleOptions } from './hts.interfaces';
import { CreateHtsTokenOutput } from './dtos/create-hts-token.dto';
import { CoreOutput } from '../common/dtos/output.dto';
import { GetTokenBalanceOutput } from './dtos/get-token-balance.dto';
import { GetAccountBalanceOutput } from './dtos/get-account-balance.dto';
export declare class HtsService {
    private readonly options;
    private readonly htsClient;
    constructor(options: HtsModuleOptions);
    createHtsAccount(): Promise<CreateHtsAccountOutput>;
    createHtsToken(name: string, symbol: string, amount: number): Promise<CreateHtsTokenOutput>;
    transferHtsToken(tokenId: string, accountId: string, amount: number): Promise<CoreOutput>;
    assoicateHtsToken(tokenId: string, accountId: string, privateKey: string): Promise<CoreOutput>;
    transferTbarToAdmin(accountId: string, amount: number, privateKey: string): Promise<{
        ok: boolean;
        error?: undefined;
    } | {
        ok: boolean;
        error: any;
    }>;
    transferHbarToAdmin(accountId: string, amount: number, privateKey: string): Promise<{
        ok: boolean;
        error?: undefined;
    } | {
        ok: boolean;
        error: any;
    }>;
    transferHbarToUser(accountId: string, amount: number): Promise<{
        ok: boolean;
        error?: undefined;
    } | {
        ok: boolean;
        error: any;
    }>;
    getAccountBalance(accountId: string): Promise<GetAccountBalanceOutput>;
    getTokenBalance(accountId: string): Promise<GetTokenBalanceOutput>;
}
