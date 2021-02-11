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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hts_service_1 = require("../hts/hts.service");
const token_entity_1 = require("./entities/token.entity");
let TokenService = class TokenService {
    constructor(tokenRepository, htsService) {
        this.tokenRepository = tokenRepository;
        this.htsService = htsService;
    }
    async createToken(createTokenInput) {
        try {
            const tokenResult = await this.htsService.createHtsToken(`${createTokenInput.title}Token`, `${createTokenInput.title}Symbol`, createTokenInput.totalStock);
            if (!tokenResult.ok) {
                return {
                    ok: false,
                    error: tokenResult.error,
                };
            }
            const token = await this.tokenRepository.save(this.tokenRepository.create(Object.assign(Object.assign({}, createTokenInput), { recentPrice: createTokenInput.initialPrice, stock: createTokenInput.totalStock, htsTokenId: tokenResult.htsTokenId })));
            return {
                ok: true,
                token,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Cannot create token',
            };
        }
    }
    async getAllTokens() {
        try {
            const tokens = await this.tokenRepository.find();
            return {
                ok: true,
                tokens,
            };
        }
        catch (err) {
            console.log(err);
            return {
                ok: false,
                error: 'Cannot get all tokens',
            };
        }
    }
    async getToken({ id }) {
        try {
            const token = await this.tokenRepository.findOneOrFail({ id });
            return {
                ok: true,
                token,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Cannot get token',
            };
        }
    }
    async updateToken(updateTokenInput) {
        try {
            const id = updateTokenInput.tokenId;
            delete updateTokenInput.tokenId;
            await this.tokenRepository.update({ id }, Object.assign({}, updateTokenInput));
            return {
                ok: true,
            };
        }
        catch (error) {
            console.log(error);
            return {
                ok: false,
                error: 'Cannot update token',
            };
        }
    }
    async makeEarning() {
        const openedTokens = await this.tokenRepository.find({
            status: token_entity_1.TokenStatus.Open,
        });
        for (const token of openedTokens) {
            const randomEarning = 0.01 + Math.floor(Math.random() * 10) / 100;
            const newLog = {
                date: new Date(),
                copyrightFee: randomEarning,
                checked: false,
            };
            const logs = token.logs;
            token.logs = [...logs, newLog];
            await this.tokenRepository.save(token);
        }
    }
    async changePrice() {
        const openedTokens = await this.tokenRepository.find({
            status: token_entity_1.TokenStatus.Open,
        });
        for (const token of openedTokens) {
            const recentPrice = token.recentPrice;
            const randomRatio = (-10 + Math.floor(Math.random() * 20)) / 1000;
            const newPrice = Math.floor(recentPrice * randomRatio);
            token.recentPrice = newPrice;
            await this.tokenRepository.save(token);
        }
    }
    async checkAllTokenLogs() {
        const openedTokens = await this.tokenRepository.find({
            status: token_entity_1.TokenStatus.Open,
        });
        for (const token of openedTokens) {
            const logs = token.logs;
            for (const log of logs) {
                log.checked = true;
            }
            token.logs = logs;
            await this.tokenRepository.save(token);
        }
    }
};
TokenService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(token_entity_1.Token)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hts_service_1.HtsService])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map