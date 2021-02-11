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
exports.HtsService = void 0;
const sdk_1 = require("@hashgraph/sdk");
const common_1 = require("@nestjs/common");
const common_constants_1 = require("../common/common.constants");
let HtsService = class HtsService {
    constructor(options) {
        this.options = options;
        const { accountId, privateKey } = options;
        const client = sdk_1.Client.forTestnet();
        client.setOperator(accountId, privateKey);
        this.htsClient = client;
    }
    async createHtsAccount() {
        try {
            const newAccountPrivateKey = sdk_1.PrivateKey.generate();
            const newAccountPublicKey = newAccountPrivateKey.publicKey;
            const newAccountTransactionResponse = await new sdk_1.AccountCreateTransaction()
                .setKey(newAccountPublicKey)
                .setInitialBalance(sdk_1.Hbar.fromTinybars(10000))
                .execute(this.htsClient);
            const getReceipt = await newAccountTransactionResponse.getReceipt(this.htsClient);
            const htsAccountId = getReceipt.accountId.toString();
            return {
                ok: true,
                htsAccountId,
                privateKey: newAccountPrivateKey.toBytes().toString(),
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Cannot create HTS account',
            };
        }
    }
    async createHtsToken(name, symbol, amount) {
        try {
            const createTokenTx = await new sdk_1.TokenCreateTransaction()
                .setTokenName(name)
                .setTokenSymbol(symbol)
                .setDecimals(0)
                .setInitialSupply(amount)
                .setTreasuryAccountId(this.options.accountId)
                .setMaxTransactionFee(new sdk_1.Hbar(30))
                .freezeWith(this.htsClient);
            const privateKey = sdk_1.PrivateKey.fromString(this.options.privateKey);
            const signTx = await (await createTokenTx.sign(privateKey)).sign(privateKey);
            const txResponse = await signTx.execute(this.htsClient);
            const createTokenReceipt = await txResponse.getReceipt(this.htsClient);
            const htsTokenId = createTokenReceipt.tokenId.toString();
            return {
                ok: true,
                htsTokenId,
            };
        }
        catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
    async transferHtsToken(tokenId, accountId, amount) {
        try {
            const tx = await new sdk_1.TransferTransaction()
                .addTokenTransfer(tokenId, accountId, amount)
                .addTokenTransfer(tokenId, this.options.accountId, amount * -1)
                .execute(this.htsClient);
            await tx.getReceipt(this.htsClient);
            return {
                ok: true,
            };
        }
        catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
    async assoicateHtsToken(tokenId, accountId, privateKey) {
        const parsedKey = privateKey.split(',').map(i => parseInt(i));
        const byteKey = new Uint8Array(parsedKey);
        const accountPrivateKey = sdk_1.PrivateKey.fromBytes(byteKey);
        try {
            const tx = new sdk_1.TokenAssociateTransaction()
                .setAccountId(sdk_1.AccountId.fromString(accountId))
                .setTokenIds([sdk_1.TokenId.fromString(tokenId)])
                .freezeWith(this.htsClient);
            const signTx = await tx.sign(accountPrivateKey);
            const txResponse = await signTx.execute(this.htsClient);
            await txResponse.getReceipt(this.htsClient);
            return {
                ok: true,
            };
        }
        catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
    async transferTbarToAdmin(accountId, amount, privateKey) {
        const parsedKey = privateKey.split(',').map(i => parseInt(i));
        const byteKey = new Uint8Array(parsedKey);
        const accountPrivateKey = sdk_1.PrivateKey.fromBytes(byteKey);
        try {
            const tx = new sdk_1.TransferTransaction()
                .addTokenTransfer(this.options.tbarTokenId, accountId, amount * -1)
                .addTokenTransfer(this.options.tbarTokenId, this.options.accountId, amount)
                .freezeWith(this.htsClient);
            const signTx = await tx.sign(accountPrivateKey);
            const signTxRes = await signTx.execute(this.htsClient);
            await signTxRes.getReceipt(this.htsClient);
            return {
                ok: true,
            };
        }
        catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
    async transferHbarToAdmin(accountId, amount, privateKey) {
        const parsedKey = privateKey.split(',').map(i => parseInt(i));
        const byteKey = new Uint8Array(parsedKey);
        const accountPrivateKey = sdk_1.PrivateKey.fromBytes(byteKey);
        try {
            const tx = new sdk_1.TransferTransaction()
                .addHbarTransfer(accountId, sdk_1.Hbar.fromTinybars(amount * -1))
                .addHbarTransfer(this.options.accountId, sdk_1.Hbar.fromTinybars(amount))
                .freezeWith(this.htsClient);
            const signTx = await tx.sign(accountPrivateKey);
            const signTxRes = await signTx.execute(this.htsClient);
            await signTxRes.getReceipt(this.htsClient);
            return {
                ok: true,
            };
        }
        catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
    async transferHbarToUser(accountId, amount) {
        try {
            const tx = new sdk_1.TransferTransaction()
                .addHbarTransfer(accountId, sdk_1.Hbar.fromTinybars(amount))
                .addHbarTransfer(this.options.accountId, sdk_1.Hbar.fromTinybars(amount * -1))
                .freezeWith(this.htsClient);
            const signTx = await tx.sign(sdk_1.PrivateKey.fromString(this.options.privateKey));
            const signTxRes = await signTx.execute(this.htsClient);
            await signTxRes.getReceipt(this.htsClient);
            return {
                ok: true,
            };
        }
        catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
    async getAccountBalance(accountId) {
        try {
            const balance = await new sdk_1.AccountBalanceQuery()
                .setAccountId(accountId)
                .execute(this.htsClient);
            return {
                ok: true,
                accountBalance: balance.hbars.toTinybars().toNumber(),
            };
        }
        catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
    async getTokenBalance(accountId) {
        try {
            const balance = await new sdk_1.AccountBalanceQuery()
                .setAccountId(accountId)
                .execute(this.htsClient);
            return {
                ok: true,
                tokenBalance: balance.tokens.toString(),
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
HtsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_constants_1.CONFIG_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], HtsService);
exports.HtsService = HtsService;
//# sourceMappingURL=hts.service.js.map