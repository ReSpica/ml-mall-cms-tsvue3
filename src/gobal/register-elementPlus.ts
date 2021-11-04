//全局引用-ElementPlus
import { App } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

export default function (app: App): void {
  app.use(ElementPlus);
}
