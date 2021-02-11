"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const music_module_1 = require("../music/music.module");
const token_module_1 = require("../token/token.module");
const investment_entity_1 = require("./entities/investment.entity");
const investment_resolver_1 = require("./investment.resolver");
const investment_service_1 = require("./investment.service");
let InvestmentModule = class InvestmentModule {
};
InvestmentModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([investment_entity_1.Investment]), music_module_1.MusicModule, token_module_1.TokenModule],
        providers: [investment_service_1.InvestmentService, investment_resolver_1.InvestmentResolver],
    })
], InvestmentModule);
exports.InvestmentModule = InvestmentModule;
//# sourceMappingURL=investment.module.js.map