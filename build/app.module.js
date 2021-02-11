"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const jwt_module_1 = require("./jwt/jwt.module");
const user_entity_1 = require("./user/entities/user.entity");
const jwt_middleware_1 = require("./jwt/jwt.middleware");
const user_module_1 = require("./user/user.module");
const hts_module_1 = require("./hts/hts.module");
const music_module_1 = require("./music/music.module");
const music_entity_1 = require("./music/entities/music.entity");
const token_module_1 = require("./token/token.module");
const investment_module_1 = require("./investment/investment.module");
const investment_entity_1 = require("./investment/entities/investment.entity");
const token_entity_1 = require("./token/entities/token.entity");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(jwt_middleware_1.JwtMiddleware).forRoutes({
            path: '/graphql',
            method: common_1.RequestMethod.ALL,
        });
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: path_1.join(process.cwd(), 'src/schema.gql'),
                context: ({ req }) => ({ user: req['user'] }),
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: +process.env.DATABASE_PORT,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                synchronize: true,
                logging: true,
                entities: [user_entity_1.User, music_entity_1.Music, token_entity_1.Token, investment_entity_1.Investment],
            }),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            jwt_module_1.JwtModule.forRoot({
                privateKey: process.env.JWT_PRIVATE_KEY,
            }),
            hts_module_1.HtsModule.forRoot({
                privateKey: process.env.HTS_PRIVATE_KEY,
                accountId: process.env.HTS_ACCOUNT_ID,
                publicKey: process.env.HTS_PUBLIC_KEY,
                key: process.env.JWT_PRIVATE_KEY,
                tbarTokenId: process.env.HTS_TBAR_TOKEN_ID,
            }),
            user_module_1.UserModule,
            music_module_1.MusicModule,
            token_module_1.TokenModule,
            investment_module_1.InvestmentModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map