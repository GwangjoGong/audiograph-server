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
exports.UpdateMusicOutput = exports.UpdateMusicInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const create_music_dto_1 = require("./create-music.dto");
let UpdateMusicInput = class UpdateMusicInput extends graphql_1.PartialType(create_music_dto_1.CreateMusicInput) {
};
__decorate([
    graphql_1.Field(is => Number),
    __metadata("design:type", Number)
], UpdateMusicInput.prototype, "id", void 0);
UpdateMusicInput = __decorate([
    graphql_1.InputType()
], UpdateMusicInput);
exports.UpdateMusicInput = UpdateMusicInput;
let UpdateMusicOutput = class UpdateMusicOutput extends output_dto_1.CoreOutput {
};
UpdateMusicOutput = __decorate([
    graphql_1.ObjectType()
], UpdateMusicOutput);
exports.UpdateMusicOutput = UpdateMusicOutput;
//# sourceMappingURL=update-music.dto.js.map