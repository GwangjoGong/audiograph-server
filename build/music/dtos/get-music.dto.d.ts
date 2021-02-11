import { CoreOutput } from '../../common/dtos/output.dto';
import { Music } from '../entities/music.entity';
export declare class GetMusicInput {
    id: number;
}
export declare class GetMusicOutput extends CoreOutput {
    music?: Music;
}
