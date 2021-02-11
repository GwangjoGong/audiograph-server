import { Repository } from 'typeorm';
import { Music } from './entities/music.entity';
import { CreateMusicInput, CreateMusicOutput } from './dtos/create-music.dto';
import { UpdateMusicInput, UpdateMusicOutput } from './dtos/update-music.dto';
import { GetMusicInput, GetMusicOutput } from './dtos/get-music.dto';
import { GetAllMusicsOutput } from './dtos/get-all-musics.dto';
import { TokenService } from '../token/token.service';
export declare class MusicService {
    private readonly musicRepository;
    private readonly tokenService;
    constructor(musicRepository: Repository<Music>, tokenService: TokenService);
    createMusic(createMusicInput: CreateMusicInput): Promise<CreateMusicOutput>;
    updateMusic(updateMusicInput: UpdateMusicInput): Promise<UpdateMusicOutput>;
    getMusic(getMusicInput: GetMusicInput): Promise<GetMusicOutput>;
    getAllMusics(): Promise<GetAllMusicsOutput>;
    getTrendingMusics(): Promise<GetAllMusicsOutput>;
    getRecentMusics(): Promise<GetAllMusicsOutput>;
}
