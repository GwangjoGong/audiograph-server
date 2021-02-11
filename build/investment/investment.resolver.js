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
exports.InvestmentResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const auth_guard_1 = require("../auth/auth.guard");
const user_entity_1 = require("../user/entities/user.entity");
const create_investment_dto_1 = require("./dtos/create-investment.dto");
const investment_entity_1 = require("./entities/investment.entity");
const investment_service_1 = require("./investment.service");
const schedule_1 = require("@nestjs/schedule");
let InvestmentResolver = class InvestmentResolver {
    constructor(investmentService) {
        this.investmentService = investmentService;
    }
    createInvestment(user, createInvestmentInput) {
        return this.investmentService.createInvestment(user, createInvestmentInput);
    }
    getMyInvestments(user) {
        return user.investments;
    }
    checkInvestments() {
        this.investmentService.checkInvestment();
    }
};
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Mutation(returns => create_investment_dto_1.CreateInvestmentOutput),
    __param(0, auth_user_decorator_1.AuthUser()),
    __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_investment_dto_1.CreateInvestmentInput]),
    __metadata("design:returntype", void 0)
], InvestmentResolver.prototype, "createInvestment", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Query(returns => [investment_entity_1.Investment]),
    __param(0, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], InvestmentResolver.prototype, "getMyInvestments", null);
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_WEEK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvestmentResolver.prototype, "checkInvestments", null);
InvestmentResolver = __decorate([
    graphql_1.Resolver(of => investment_entity_1.Investment),
    __metadata("design:paramtypes", [investment_service_1.InvestmentService])
], InvestmentResolver);
exports.InvestmentResolver = InvestmentResolver;
//# sourceMappingURL=investment.resolver.js.map