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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hts_service_1 = require("../hts/hts.service");
const jwt_service_1 = require("../jwt/jwt.service");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(users, htsService, jwtService) {
        this.users = users;
        this.htsService = htsService;
        this.jwtService = jwtService;
    }
    async userProfile(id) {
        try {
            const user = await this.users.findOneOrFail({ id });
            return {
                ok: true,
                user,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'User not found',
            };
        }
    }
    async createAccount(createAccountInput) {
        try {
            const existingUser = await this.users.findOne({
                email: createAccountInput.email,
            });
            if (existingUser) {
                return {
                    ok: false,
                    error: 'Account already exists',
                };
            }
            const { ok, error, htsAccountId, privateKey, } = await this.htsService.createHtsAccount();
            if (!ok) {
                return {
                    ok,
                    error,
                };
            }
            await this.users.save(this.users.create(Object.assign(Object.assign({}, createAccountInput), { htsAccountId,
                privateKey })));
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Cannot create account',
            };
        }
    }
    async login({ email, password }) {
        try {
            const user = await this.users.findOne({ email }, { select: ['id', 'password'] });
            if (!user) {
                return {
                    ok: false,
                    error: "Couldn't find user",
                };
            }
            const correct = await user.checkPassword(password);
            if (!correct) {
                return {
                    ok: false,
                    error: 'Check your email and password',
                };
            }
            const token = this.jwtService.sign(user.id);
            return {
                ok: true,
                token,
            };
        }
        catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hts_service_1.HtsService,
        jwt_service_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map