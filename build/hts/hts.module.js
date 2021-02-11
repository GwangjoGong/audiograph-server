"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HtsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtsModule = void 0;
const common_1 = require("@nestjs/common");
const common_constants_1 = require("../common/common.constants");
const hts_service_1 = require("./hts.service");
let HtsModule = HtsModule_1 = class HtsModule {
    static forRoot(options) {
        return {
            module: HtsModule_1,
            exports: [hts_service_1.HtsService],
            providers: [{ provide: common_constants_1.CONFIG_OPTIONS, useValue: options }, hts_service_1.HtsService],
        };
    }
};
HtsModule = HtsModule_1 = __decorate([
    common_1.Module({}),
    common_1.Global()
], HtsModule);
exports.HtsModule = HtsModule;
//# sourceMappingURL=hts.module.js.map