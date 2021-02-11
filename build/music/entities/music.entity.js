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
exports.Music = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const token_entity_1 = require("../../token/entities/token.entity");
const investment_entity_1 = require("../../investment/entities/investment.entity");
let Music = class Music extends core_entity_1.CoreEntity {
};
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(is => String),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Music.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(is => String),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Music.prototype, "coverImage", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(is => String),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Music.prototype, "sourceUrl", void 0);
__decorate([
    typeorm_1.Column('text', { array: true }),
    graphql_1.Field(is => [String]),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], Music.prototype, "artist", void 0);
__decorate([
    typeorm_1.Column('text', { array: true, nullable: true }),
    graphql_1.Field(is => [String], { nullable: true }),
    class_validator_1.IsArray(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], Music.prototype, "composer", void 0);
__decorate([
    typeorm_1.Column('text', { array: true, nullable: true }),
    graphql_1.Field(is => [String], { nullable: true }),
    class_validator_1.IsArray(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], Music.prototype, "arranger", void 0);
__decorate([
    typeorm_1.Column('text', { array: true, nullable: true }),
    graphql_1.Field(is => [String], { nullable: true }),
    class_validator_1.IsArray(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], Music.prototype, "lyricist", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    graphql_1.Field(is => String, { nullable: true }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Music.prototype, "copyrightPeriod", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    graphql_1.Field(is => String, { nullable: true }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Music.prototype, "copyrightTrust", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    graphql_1.Field(is => String, { nullable: true }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Music.prototype, "representativeTrustee", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    graphql_1.Field(is => String, { nullable: true }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Music.prototype, "caution", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    graphql_1.Field(is => Date, { nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], Music.prototype, "publishDate", void 0);
__decorate([
    typeorm_1.OneToOne(to => token_entity_1.Token, { eager: true, onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn(),
    graphql_1.Field(is => token_entity_1.Token),
    __metadata("design:type", token_entity_1.Token)
], Music.prototype, "token", void 0);
__decorate([
    typeorm_1.OneToMany(to => investment_entity_1.Investment, investment => investment.music),
    graphql_1.Field(is => [investment_entity_1.Investment], { defaultValue: [] }),
    __metadata("design:type", Array)
], Music.prototype, "investments", void 0);
Music = __decorate([
    graphql_1.InputType('MusicInputType', { isAbstract: true }),
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], Music);
exports.Music = Music;
//# sourceMappingURL=music.entity.js.map