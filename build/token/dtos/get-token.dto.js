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
exports.GetTokenOutput = exports.GetTokenInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const output_dto_1 = require("../../common/dtos/output.dto");
const token_entity_1 = require("../entities/token.entity");
let GetTokenInput = class GetTokenInput {
};
__decorate([
    graphql_1.Field(is => Number),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], GetTokenInput.prototype, "id", void 0);
GetTokenInput = __decorate([
    graphql_1.InputType()
], GetTokenInput);
exports.GetTokenInput = GetTokenInput;
let GetTokenOutput = class GetTokenOutput extends output_dto_1.CoreOutput {
};
__decorate([
    graphql_1.Field(is => token_entity_1.Token, { nullable: true }),
    __metadata("design:type", token_entity_1.Token)
], GetTokenOutput.prototype, "token", void 0);
GetTokenOutput = __decorate([
    graphql_1.ObjectType()
], GetTokenOutput);
exports.GetTokenOutput = GetTokenOutput;
//# sourceMappingURL=get-token.dto.js.map