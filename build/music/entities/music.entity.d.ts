import { CoreEntity } from 'src/common/entities/core.entity';
import { Token } from '../../token/entities/token.entity';
import { Investment } from '../../investment/entities/investment.entity';
export declare class Music extends CoreEntity {
    title: string;
    coverImage: string;
    sourceUrl: string;
    artist: string[];
    composer?: string[];
    arranger?: string[];
    lyricist?: string[];
    copyrightPeriod?: string;
    copyrightTrust?: string;
    representativeTrustee?: string;
    caution?: string;
    publishDate?: Date;
    token: Token;
    investments: Investment[];
}
