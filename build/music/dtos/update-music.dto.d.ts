import { CoreOutput } from '../../common/dtos/output.dto';
import { CreateMusicInput } from './create-music.dto';
declare const UpdateMusicInput_base: import("@nestjs/common").Type<Partial<CreateMusicInput>>;
export declare class UpdateMusicInput extends UpdateMusicInput_base {
    id: number;
}
export declare class UpdateMusicOutput extends CoreOutput {
}
export {};
