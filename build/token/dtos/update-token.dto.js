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
exports.UpdateTokenOutput = exports.UpdateTokenInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const output_dto_1 = require("../../common/dtos/output.dto");
const create_token_dto_1 = require("./create-token.dto");
let UpdateTokenInput = class UpdateTokenInput extends graphql_1.PartialType(create_token_dto_1.CreateTokenInput) {
};
__decorate([
    graphql_1.Field(is => Number),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UpdateTokenInput.prototype, "tokenId", void 0);
UpdateTokenInput = __decorate([
    graphql_1.InputType()
], UpdateTokenInput);
exports.UpdateTokenInput = UpdateTokenInput;
let UpdateTokenOutput = class UpdateTokenOutput extends output_dto_1.CoreOutput {
};
UpdateTokenOutput = __decorate([
    graphql_1.ObjectType()
], UpdateTokenOutput);
exports.UpdateTokenOutput = UpdateTokenOutput;
//# sourceMappingURL=update-token.dto.js.map