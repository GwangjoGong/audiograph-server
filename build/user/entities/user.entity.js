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
exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const investment_entity_1 = require("../../investment/entities/investment.entity");
let User = class User extends core_entity_1.CoreEntity {
    async hashPassword() {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            }
            catch (err) {
                console.log(err);
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    checkPassword(aPassword) {
        try {
            return bcrypt.compare(aPassword, this.password);
        }
        catch (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException();
        }
    }
};
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(is => String),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ select: false }),
    graphql_1.Field(is => String),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(is => String),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "htsAccountId", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(is => String),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], User.prototype, "privateKey", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
__decorate([
    typeorm_1.OneToMany(to => investment_entity_1.Investment, investment => investment.user, { eager: true }),
    graphql_1.Field(is => [investment_entity_1.Investment]),
    __metadata("design:type", Array)
], User.prototype, "investments", void 0);
User = __decorate([
    graphql_1.InputType('UserInputType', { isAbstract: true }),
    graphql_1.ObjectType(),
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map