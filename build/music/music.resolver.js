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
exports.MusicResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_guard_1 = require("../auth/auth.guard");
const create_music_dto_1 = require("./dtos/create-music.dto");
const get_all_musics_dto_1 = require("./dtos/get-all-musics.dto");
const get_music_dto_1 = require("./dtos/get-music.dto");
const update_music_dto_1 = require("./dtos/update-music.dto");
const music_entity_1 = require("./entities/music.entity");
const music_service_1 = require("./music.service");
let MusicResolver = class MusicResolver {
    constructor(musicService) {
        this.musicService = musicService;
    }
    getAllMusics() {
        return this.musicService.getAllMusics();
    }
    getTrendingMusics() {
        return this.musicService.getTrendingMusics();
    }
    getRecentMusics() {
        return this.musicService.getRecentMusics();
    }
    getMusic(getMusicInput) {
        return this.musicService.getMusic(getMusicInput);
    }
    createMusic(createMusicInput) {
        return this.musicService.createMusic(createMusicInput);
    }
    updateMusic(updateMusicInput) {
        return this.musicService.updateMusic(updateMusicInput);
    }
};
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Query(returns => get_all_musics_dto_1.GetAllMusicsOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MusicResolver.prototype, "getAllMusics", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Query(returns => get_all_musics_dto_1.GetAllMusicsOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MusicResolver.prototype, "getTrendingMusics", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Query(returns => get_all_musics_dto_1.GetAllMusicsOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MusicResolver.prototype, "getRecentMusics", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Query(returns => get_music_dto_1.GetMusicOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_music_dto_1.GetMusicInput]),
    __metadata("design:returntype", void 0)
], MusicResolver.prototype, "getMusic", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Mutation(returns => create_music_dto_1.CreateMusicOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_music_dto_1.CreateMusicInput]),
    __metadata("design:returntype", void 0)
], MusicResolver.prototype, "createMusic", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Mutation(returns => update_music_dto_1.UpdateMusicOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_music_dto_1.UpdateMusicInput]),
    __metadata("design:returntype", void 0)
], MusicResolver.prototype, "updateMusic", null);
MusicResolver = __decorate([
    graphql_1.Resolver(of => music_entity_1.Music),
    __metadata("design:paramtypes", [music_service_1.MusicService])
], MusicResolver);
exports.MusicResolver = MusicResolver;
//# sourceMappingURL=music.resolver.js.map