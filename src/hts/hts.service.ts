import {
  AccountCreateTransaction,
  Client,
  Hbar,
  Ed25519PrivateKey as PrivateKey,
} from '@hashgraph/sdk';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { CreateHtsAccountOutput } from './dtos/create-hts-account.dto';
import { HtsModuleOptions } from './hts.interfaces';
import * as CryptoJS from 'crypto-js';

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
      const newAccountPrivateKey = await PrivateKey.generate();
      const newAccountPublicKey = newAccountPrivateKey.publicKey;

      //Create a new account with 1,000 tinybar starting balance
      const newAccountTransactionResponse = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybar(1000))
        .execute(this.htsClient);

      // Get the new account ID
      const getReceipt = await newAccountTransactionResponse.getReceipt(
        this.htsClient,
      );
      const newAccountId = getReceipt.getAccountId().toString();
      const hashedId = CryptoJS.AES.encrypt(
        newAccountId,
        this.options.key,
      ).toString();
      return {
        ok: true,
        htsAccountId: hashedId,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot create HTS account.',
      };
    }
  }

  getDecryptedAccountId(id: string): string {
    return CryptoJS.AES.decrypt(id, this.options.key).toString();
  }
}
