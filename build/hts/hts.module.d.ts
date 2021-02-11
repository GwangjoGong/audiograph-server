import { DynamicModule } from '@nestjs/common';
import { HtsModuleOptions } from './hts.interfaces';
export declare class HtsModule {
    static forRoot(options: HtsModuleOptions): DynamicModule;
}
