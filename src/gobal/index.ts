import { App } from 'vue';
import registerElementPLus from './register-elementPlus';
import '@/network/mock';
import './register-normalizeCss';
import registerProperties from './register-properties';

export function gobalRegister(app: App): void {
  registerElementPLus(app);
  registerProperties(app);
  console.log('第三方内容配置完成');
}
