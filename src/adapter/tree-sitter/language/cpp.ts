import { BaseLSP } from '../base';

export class CppLSP extends BaseLSP{
  async init():Promise<void>{
    await super.init();
  }
}