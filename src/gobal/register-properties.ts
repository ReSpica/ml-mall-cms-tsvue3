import { App } from 'vue';
import { formatUtcString } from '@/util/date-format';
export default function registerProperties(app: App) {
  return (app.config.globalProperties.$filters = {
    foo() {
      console.log('object');
    },
    formatTime(value: string) {
      return formatUtcString(value);
    }
  });
}
