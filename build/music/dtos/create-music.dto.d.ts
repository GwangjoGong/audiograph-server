import { CoreOutput } from '../../common/dtos/output.dto';
import { Music } from '../entities/music.entity';
declare const CreateMusicInput_base: import("@nestjs/common").Type<Pick<Music, "title" | "coverImage" | "sourceUrl" | "artist" | "composer" | "arranger" | "lyricist" | "copyrightPeriod" | "copyrightTrust" | "representativeTrustee" | "caution" | "publishDate">>;
export declare class CreateMusicInput extends CreateMusicInput_base {
    initialPrice: number;
    totalStock: number;
}
export declare class CreateMusicOutput extends CoreOutput {
}
export {};
