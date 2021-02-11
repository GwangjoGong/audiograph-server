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
exports.GetMusicOutput = exports.GetMusicInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const output_dto_1 = require("../../common/dtos/output.dto");
const music_entity_1 = require("../entities/music.entity");
let GetMusicInput = class GetMusicInput {
};
__decorate([
    graphql_1.Field(is => Number),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], GetMusicInput.prototype, "id", void 0);
GetMusicInput = __decorate([
    graphql_1.InputType()
], GetMusicInput);
exports.GetMusicInput = GetMusicInput;
let GetMusicOutput = class GetMusicOutput extends output_dto_1.CoreOutput {
};
__decorate([
    graphql_1.Field(is => music_entity_1.Music, { nullable: true }),
    __metadata("design:type", music_entity_1.Music)
], GetMusicOutput.prototype, "music", void 0);
GetMusicOutput = __decorate([
    graphql_1.ObjectType()
], GetMusicOutput);
exports.GetMusicOutput = GetMusicOutput;
//# sourceMappingURL=get-music.dto.js.map