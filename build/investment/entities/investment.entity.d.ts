import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from '../../user/entities/user.entity';
import { Music } from '../../music/entities/music.entity';
export declare class Investment extends CoreEntity {
    amount: number;
    price: number;
    user: User;
    music: Music;
}
