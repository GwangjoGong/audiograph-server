import { CoreOutput } from '../../common/dtos/output.dto';
import { Music } from '../entities/music.entity';
export declare class GetAllMusicsOutput extends CoreOutput {
    musics?: Music[];
}
