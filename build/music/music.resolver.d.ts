import { CreateMusicInput, CreateMusicOutput } from './dtos/create-music.dto';
import { GetAllMusicsOutput } from './dtos/get-all-musics.dto';
import { GetMusicInput, GetMusicOutput } from './dtos/get-music.dto';
import { UpdateMusicInput, UpdateMusicOutput } from './dtos/update-music.dto';
import { MusicService } from './music.service';
export declare class MusicResolver {
    private readonly musicService;
    constructor(musicService: MusicService);
    getAllMusics(): Promise<GetAllMusicsOutput>;
    getTrendingMusics(): Promise<GetAllMusicsOutput>;
    getRecentMusics(): Promise<GetAllMusicsOutput>;
    getMusic(getMusicInput: GetMusicInput): Promise<GetMusicOutput>;
    createMusic(createMusicInput: CreateMusicInput): Promise<CreateMusicOutput>;
    updateMusic(updateMusicInput: UpdateMusicInput): Promise<UpdateMusicOutput>;
}
