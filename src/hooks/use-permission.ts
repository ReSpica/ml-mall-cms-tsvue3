import { newUseStore } from '@/store';

export function usePermission(pageName: string, hanldeName: string) {
  const store = newUseStore();
  const permissions = store.state.login.permissions;
  const verifyPermission = `system:${pageName}:${hanldeName}`;
  return Boolean(permissions.find((item: any) => item === verifyPermission));
}
