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
exports.Token = exports.TokenEarningLog = exports.TokenStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
var TokenStatus;
(function (TokenStatus) {
    TokenStatus["Investing"] = "Investing";
    TokenStatus["Open"] = "Open";
    TokenStatus["Close"] = "Close";
})(TokenStatus = exports.TokenStatus || (exports.TokenStatus = {}));
graphql_1.registerEnumType(TokenStatus, { name: 'TokenStatus' });
let TokenEarningLog = class TokenEarningLog {
};
__decorate([
    graphql_1.Field(is => Date),
    __metadata("design:type", Date)
], TokenEarningLog.prototype, "date", void 0);
__decorate([
    graphql_1.Field(is => Number),
    __metadata("design:type", Number)
], TokenEarningLog.prototype, "copyrightFee", void 0);
__decorate([
    graphql_1.Field(is => Boolean),
    __metadata("design:type", Boolean)
], TokenEarningLog.prototype, "checked", void 0);
TokenEarningLog = __decorate([
    graphql_1.InputType('TokenEarningLogInputType', { isAbstract: true }),
    graphql_1.ObjectType()
], TokenEarningLog);
exports.TokenEarningLog = TokenEarningLog;
let Token = class Token extends core_entity_1.CoreEntity {
};
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(is => String),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Token.prototype, "htsTokenId", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(is => Number),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Token.prototype, "initialPrice", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    graphql_1.Field(is => Number, { nullable: true }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], Token.prototype, "recentPrice", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    graphql_1.Field(is => Number, { nullable: true }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], Token.prototype, "stock", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(is => Number),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Token.prototype, "totalStock", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: TokenStatus, default: TokenStatus.Investing }),
    graphql_1.Field(is => TokenStatus, { defaultValue: TokenStatus.Investing }),
    class_validator_1.IsEnum(TokenStatus),
    __metadata("design:type", String)
], Token.prototype, "status", void 0);
__decorate([
    graphql_1.Field(is => [TokenEarningLog], { defaultValue: [] }),
    typeorm_1.Column({ type: 'json', default: [] }),
    __metadata("design:type", Array)
], Token.prototype, "logs", void 0);
Token = __decorate([
    graphql_1.InputType('TokenInputType', { isAbstract: true }),
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], Token);
exports.Token = Token;
//# sourceMappingURL=token.entity.js.map