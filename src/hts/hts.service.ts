import {
  AccountCreateTransaction,
  Client,
  Hbar,
  PrivateKey,
  TokenCreateTransaction,
  TokenAssociateTransaction,
  TransferTransaction,
  AccountBalanceQuery,
  AccountId,
  TokenId,
} from '@hashgraph/sdk';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { CreateHtsAccountOutput } from './dtos/create-hts-account.dto';
import { HtsModuleOptions } from './hts.interfaces';
import { CreateHtsTokenOutput } from './dtos/create-hts-token.dto';
import { CoreOutput } from '../common/dtos/output.dto';
import { GetTokenBalanceOutput } from './dtos/get-token-balance.dto';
import { GetAccountBalanceOutput } from './dtos/get-account-balance.dto';

@Injectable()
export class HtsService {
  private readonly htsClient: Client;

  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: HtsModuleOptions,
  ) {
    const { accountId, privateKey } = options;

    const client = Client.forTestnet();
    client.setOperator(accountId, privateKey);
    this.htsClient = client;
  }

  async createHtsAccount(): Promise<CreateHtsAccountOutput> {
    try {
      const newAccountPrivateKey = PrivateKey.generate();
      const newAccountPublicKey = newAccountPrivateKey.publicKey;

      const newAccountTransactionResponse = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybars(10000))
        .execute(this.htsClient);

      const getReceipt = await newAccountTransactionResponse.getReceipt(
        this.htsClient,
      );
      const htsAccountId = getReceipt.accountId.toString();

      return {
        ok: true,
        htsAccountId,
        privateKey: newAccountPrivateKey.toBytes().toString(),
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot create HTS account',
      };
    }
  }

  async createHtsToken(
    name: string,
    symbol: string,
    amount: number,
  ): Promise<CreateHtsTokenOutput> {
    try {
      const createTokenTx = await new TokenCreateTransaction()
        .setTokenName(name)
        .setTokenSymbol(symbol)
        .setDecimals(0)
        .setInitialSupply(amount)
        .setTreasuryAccountId(this.options.accountId)
        .setMaxTransactionFee(new Hbar(30))
        .freezeWith(this.htsClient);
      const privateKey = PrivateKey.fromString(this.options.privateKey);

      const signTx = await (await createTokenTx.sign(privateKey)).sign(
        privateKey,
      );

      const txResponse = await signTx.execute(this.htsClient);
      const createTokenReceipt = await txResponse.getReceipt(this.htsClient);
      const htsTokenId = createTokenReceipt.tokenId.toString();

      return {
        ok: true,
        htsTokenId,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async transferHtsToken(
    tokenId: string,
    accountId: string,
    amount: number,
  ): Promise<CoreOutput> {
    try {
      const tx = await new TransferTransaction()
        .addTokenTransfer(tokenId, accountId, amount)
        .addTokenTransfer(tokenId, this.options.accountId, amount * -1)
        .execute(this.htsClient);

      await tx.getReceipt(this.htsClient);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async assoicateHtsToken(
    tokenId: string,
    accountId: string,
    privateKey: string,
  ): Promise<CoreOutput> {
    const parsedKey = privateKey.split(',').map(i => parseInt(i));
    const byteKey = new Uint8Array(parsedKey);

    const accountPrivateKey = PrivateKey.fromBytes(byteKey);
    try {
      const tx = new TokenAssociateTransaction()
        .setAccountId(AccountId.fromString(accountId))
        .setTokenIds([TokenId.fromString(tokenId)])
        .freezeWith(this.htsClient);

      const signTx = await tx.sign(accountPrivateKey);

      const txResponse = await signTx.execute(this.htsClient);

      await txResponse.getReceipt(this.htsClient);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async transferTbarToAdmin(
    accountId: string,
    amount: number,
    privateKey: string,
  ) {
    const parsedKey = privateKey.split(',').map(i => parseInt(i));
    const byteKey = new Uint8Array(parsedKey);

    const accountPrivateKey = PrivateKey.fromBytes(byteKey);
    try {
      const tx = new TransferTransaction()
        .addTokenTransfer(this.options.tbarTokenId, accountId, amount * -1)
        .addTokenTransfer(
          this.options.tbarTokenId,
          this.options.accountId,
          amount,
        )
        .freezeWith(this.htsClient);

      const signTx = await tx.sign(accountPrivateKey);
      const signTxRes = await signTx.execute(this.htsClient);

      await signTxRes.getReceipt(this.htsClient);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async transferHbarToAdmin(
    accountId: string,
    amount: number,
    privateKey: string,
  ) {
    const parsedKey = privateKey.split(',').map(i => parseInt(i));
    const byteKey = new Uint8Array(parsedKey);

    const accountPrivateKey = PrivateKey.fromBytes(byteKey);
    try {
      const tx = new TransferTransaction()
        .addHbarTransfer(accountId, Hbar.fromTinybars(amount * -1))
        .addHbarTransfer(this.options.accountId, Hbar.fromTinybars(amount))
        .freezeWith(this.htsClient);

      const signTx = await tx.sign(accountPrivateKey);
      const signTxRes = await signTx.execute(this.htsClient);

      await signTxRes.getReceipt(this.htsClient);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async getAccountBalance(accountId: string): Promise<GetAccountBalanceOutput> {
    try {
      const balance = await new AccountBalanceQuery()
        .setAccountId(accountId)
        .execute(this.htsClient);
      return {
        ok: true,
        accountBalance: balance.hbars.toTinybars().toNumber(),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async getTokenBalance(accountId: string): Promise<GetTokenBalanceOutput> {
    try {
      const balance = await new AccountBalanceQuery()
        .setAccountId(accountId)
        .execute(this.htsClient);
      return {
        ok: true,
        tokenBalance: balance.tokens.toString(),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
