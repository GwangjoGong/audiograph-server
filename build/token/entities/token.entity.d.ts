import { CoreEntity } from 'src/common/entities/core.entity';
export declare enum TokenStatus {
    Investing = "Investing",
    Open = "Open",
    Close = "Close"
}
export declare class TokenEarningLog {
    date: Date;
    copyrightFee: number;
    checked: boolean;
}
export declare class Token extends CoreEntity {
    htsTokenId: string;
    initialPrice: number;
    recentPrice?: number;
    stock?: number;
    totalStock: number;
    status: TokenStatus;
    logs: TokenEarningLog[];
}
