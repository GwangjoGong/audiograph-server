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
exports.InvestmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hts_service_1 = require("../hts/hts.service");
const music_service_1 = require("../music/music.service");
const token_entity_1 = require("../token/entities/token.entity");
const token_service_1 = require("../token/token.service");
const investment_entity_1 = require("./entities/investment.entity");
let InvestmentService = class InvestmentService {
    constructor(investmentRepository, musicService, tokenService, htsService) {
        this.investmentRepository = investmentRepository;
        this.musicService = musicService;
        this.tokenService = tokenService;
        this.htsService = htsService;
    }
    async createInvestment(user, createInvestmentInput) {
        try {
            const { ok, error, music } = await this.musicService.getMusic({
                id: createInvestmentInput.musicId,
            });
            if (!ok) {
                return {
                    ok,
                    error,
                };
            }
            if (music.token.stock < createInvestmentInput.amount) {
                return {
                    ok: false,
                    error: 'Cannot invest more than available stock number',
                };
            }
            const associateTokenResult = await this.htsService.assoicateHtsToken(music.token.htsTokenId, user.htsAccountId, user.privateKey);
            if (!associateTokenResult.ok) {
                return {
                    ok: false,
                    error: associateTokenResult.error,
                };
            }
            const transferTokenResult = await this.htsService.transferHtsToken(music.token.htsTokenId, user.htsAccountId, createInvestmentInput.amount);
            if (!transferTokenResult.ok) {
                return {
                    ok: false,
                    error: transferTokenResult.error,
                };
            }
            const transferHbarResult = await this.htsService.transferHbarToAdmin(user.htsAccountId, createInvestmentInput.amount * music.token.initialPrice, user.privateKey);
            if (!transferHbarResult.ok) {
                return {
                    ok: false,
                    error: transferHbarResult.error,
                };
            }
            await this.investmentRepository.save(this.investmentRepository.create({
                user,
                music,
                amount: createInvestmentInput.amount,
                price: music.token.initialPrice,
            }));
            const leftStock = music.token.stock - createInvestmentInput.amount;
            await this.tokenService.updateToken({
                tokenId: music.token.id,
                stock: leftStock,
            });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Cannot create investment',
            };
        }
    }
    async checkInvestment() {
        try {
            const investments = await this.investmentRepository.find();
            const targetInvestments = investments.filter(i => i.music.token.status === token_entity_1.TokenStatus.Open);
            for (const investment of targetInvestments) {
                const holder = investment.user;
                const token = investment.music.token;
                const uncheckedLogs = token.logs.filter(l => !l.checked);
                const totalEarnings = uncheckedLogs.reduce((acc, val) => acc + val.copyrightFee, 0);
                await this.htsService.transferHbarToUser(holder.htsAccountId, totalEarnings);
            }
            await this.tokenService.checkAllTokenLogs();
        }
        catch (error) {
            console.error(error);
        }
    }
};
InvestmentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(investment_entity_1.Investment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        music_service_1.MusicService,
        token_service_1.TokenService,
        hts_service_1.HtsService])
], InvestmentService);
exports.InvestmentService = InvestmentService;
//# sourceMappingURL=investment.service.js.map