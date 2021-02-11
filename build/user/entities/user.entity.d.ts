import { CoreEntity } from 'src/common/entities/core.entity';
import { Investment } from '../../investment/entities/investment.entity';
export declare class User extends CoreEntity {
    email: string;
    password: string;
    htsAccountId: string;
    privateKey: string;
    hashPassword(): Promise<void>;
    checkPassword(aPassword: string): Promise<boolean>;
    investments: Investment[];
}
