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
exports.CreateMusicOutput = exports.CreateMusicInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const music_entity_1 = require("../entities/music.entity");
let CreateMusicInput = class CreateMusicInput extends graphql_1.OmitType(music_entity_1.Music, [
    'id',
    'createdAt',
    'updatedAt',
    'investments',
    'token',
]) {
};
__decorate([
    graphql_1.Field(is => Number),
    __metadata("design:type", Number)
], CreateMusicInput.prototype, "initialPrice", void 0);
__decorate([
    graphql_1.Field(is => Number),
    __metadata("design:type", Number)
], CreateMusicInput.prototype, "totalStock", void 0);
CreateMusicInput = __decorate([
    graphql_1.InputType()
], CreateMusicInput);
exports.CreateMusicInput = CreateMusicInput;
let CreateMusicOutput = class CreateMusicOutput extends output_dto_1.CoreOutput {
};
CreateMusicOutput = __decorate([
    graphql_1.ObjectType()
], CreateMusicOutput);
exports.CreateMusicOutput = CreateMusicOutput;
//# sourceMappingURL=create-music.dto.js.map