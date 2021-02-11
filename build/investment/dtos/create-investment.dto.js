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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInvestmentOutput = exports.CreateInvestmentInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const output_dto_1 = require("../../common/dtos/output.dto");
const investment_entity_1 = require("../entities/investment.entity");
let CreateInvestmentInput = class CreateInvestmentInput extends graphql_1.PickType(investment_entity_1.Investment, ['amount']) {
};
__decorate([
    graphql_1.Field(is => Number),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateInvestmentInput.prototype, "musicId", void 0);
CreateInvestmentInput = __decorate([
    graphql_1.InputType()
], CreateInvestmentInput);
exports.CreateInvestmentInput = CreateInvestmentInput;
let CreateInvestmentOutput = class CreateInvestmentOutput extends output_dto_1.CoreOutput {
};
CreateInvestmentOutput = __decorate([
    graphql_1.ObjectType()
], CreateInvestmentOutput);
exports.CreateInvestmentOutput = CreateInvestmentOutput;
//# sourceMappingURL=create-investment.dto.js.map