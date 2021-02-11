"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const music_entity_1 = require("./entities/music.entity");
const token_service_1 = require("../token/token.service");
const token_entity_1 = require("../token/entities/token.entity");
let MusicService = class MusicService {
    constructor(musicRepository, tokenService) {
        this.musicRepository = musicRepository;
        this.tokenService = tokenService;
    }
    async createMusic(createMusicInput) {
        try {
            const { ok, error, token } = await this.tokenService.createToken({
                title: createMusicInput.title,
                initialPrice: createMusicInput.initialPrice,
                totalStock: createMusicInput.totalStock,
                status: token_entity_1.TokenStatus.Investing,
                logs: [],
            });
            if (!ok) {
                return {
                    ok,
                    error,
                };
            }
            await this.musicRepository.save(this.musicRepository.create(Object.assign({ token }, createMusicInput)));
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Cannot create music',
            };
        }
    }
    async updateMusic(updateMusicInput) {
        try {
            await this.musicRepository.findOneOrFail({ id: updateMusicInput.id });
            await this.musicRepository.update({ id: updateMusicInput.id }, Object.assign({}, updateMusicInput));
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Cannot update music',
            };
        }
    }
    async getMusic(getMusicInput) {
        try {
            const music = await this.musicRepository.findOneOrFail({
                id: getMusicInput.id,
            });
            return {
                ok: true,
                music,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Cannot get music',
            };
        }
    }
    async getAllMusics() {
        try {
            const musics = await this.musicRepository.find();
            return {
                ok: true,
                musics,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Cannot get all musics',
            };
        }
    }
    async getTrendingMusics() {
        try {
            const musics = await this.musicRepository.find({
                relations: ['token'],
            });
            const sorted = musics.sort((m1, m2) => m1.token.stock - m2.token.stock);
            return {
                ok: true,
                musics: sorted.slice(0, 3),
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Cannot get all musics',
            };
        }
    }
    async getRecentMusics() {
        try {
            const musics = await this.musicRepository.find({
                relations: ['token'],
                order: {
                    createdAt: 'DESC',
                },
                take: 3,
            });
            return {
                ok: true,
                musics,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Cannot get all musics',
            };
        }
    }
};
MusicService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(music_entity_1.Music)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        token_service_1.TokenService])
], MusicService);
exports.MusicService = MusicService;
//# sourceMappingURL=music.service.js.map