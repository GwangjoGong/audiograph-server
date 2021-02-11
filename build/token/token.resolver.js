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
exports.TokenResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_guard_1 = require("../auth/auth.guard");
const create_token_dto_1 = require("./dtos/create-token.dto");
const get_all_tokens_dto_1 = require("./dtos/get-all-tokens.dto");
const get_token_dto_1 = require("./dtos/get-token.dto");
const update_token_dto_1 = require("./dtos/update-token.dto");
const token_entity_1 = require("./entities/token.entity");
const token_service_1 = require("./token.service");
const schedule_1 = require("@nestjs/schedule");
let TokenResolver = class TokenResolver {
    constructor(tokenSerivce) {
        this.tokenSerivce = tokenSerivce;
    }
    getAllTokens() {
        return this.tokenSerivce.getAllTokens();
    }
    getToken(getTokenInput) {
        return this.tokenSerivce.getToken(getTokenInput);
    }
    createToken(createTokenInput) {
        return this.tokenSerivce.createToken(createTokenInput);
    }
    updateToken(updateTokenInput) {
        return this.tokenSerivce.updateToken(updateTokenInput);
    }
    makeEarning() {
        this.tokenSerivce.makeEarning();
    }
    changePrice() {
        this.tokenSerivce.changePrice();
    }
};
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Query(returns => get_all_tokens_dto_1.GetAllTokensOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TokenResolver.prototype, "getAllTokens", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Query(returns => get_token_dto_1.GetTokenOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_token_dto_1.GetTokenInput]),
    __metadata("design:returntype", void 0)
], TokenResolver.prototype, "getToken", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Mutation(returns => create_token_dto_1.CreateTokenOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_token_dto_1.CreateTokenInput]),
    __metadata("design:returntype", void 0)
], TokenResolver.prototype, "createToken", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Mutation(returns => update_token_dto_1.UpdateTokenOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_token_dto_1.UpdateTokenInput]),
    __metadata("design:returntype", void 0)
], TokenResolver.prototype, "updateToken", null);
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_DAY_AT_1PM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TokenResolver.prototype, "makeEarning", null);
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_10_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TokenResolver.prototype, "changePrice", null);
TokenResolver = __decorate([
    graphql_1.Resolver(of => token_entity_1.Token),
    __metadata("design:paramtypes", [token_service_1.TokenService])
], TokenResolver);
exports.TokenResolver = TokenResolver;
//# sourceMappingURL=token.resolver.js.map