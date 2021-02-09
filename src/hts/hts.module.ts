import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { HtsModuleOptions } from './hts.interfaces';
import { HtsService } from './hts.service';

@Module({})
@Global()
export class HtsModule {
  static forRoot(options: HtsModuleOptions): DynamicModule {
    return {
      module: HtsModule,
      exports: [HtsService],
      providers: [{ provide: CONFIG_OPTIONS, useValue: options }, HtsService],
    };
  }
}
