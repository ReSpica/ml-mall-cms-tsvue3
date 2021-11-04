import { RouteRecordRaw } from 'vue-router';
import { IBreadcrumb } from '@/base-ui/breadcrumb';

//在菜单循环时候找出第一个菜单记录下来，用于初始显示
let firstMenu: any = null;

//通过传来的菜单，返回一个router对象
export function mapMenusToRouter(menus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  //1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context('../router/main', true, /\.ts/);
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1]);
    allRoutes.push(route.default);
  });
  console.log('系统所有路由', allRoutes);

  //2.根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((item) => item.path === menu.url);

        if (route) {
          routes.push(route);
        }
        if (!firstMenu) {
          firstMenu = menu; //只记录第一次循环到type为2的菜单
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };
  _recurseGetRoute(menus);
  console.log('给当前用户分配的路由', routes);

  return routes;
}

//通过传来的菜单和路径进行匹配获取需要的那个菜单
export function pathMapToMenu(userMenus: any[], currentPath: string): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

//通过传来的菜单和路径进行匹配获取菜单集合
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = [];
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumbs.push({ name: menu.name }); //面包屑第一层记录
        breadcrumbs.push({ name: findMenu.name, path: findMenu.url }); //面包屑第二层记录
        return breadcrumbs;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

//通过菜单获取所有的权限
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = [];
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };
  _recurseGetPermission(userMenus);
  return permissions;
}

//通过菜单获取所有的叶子节点用于树的选中和展开
export function getMenuLeafKey(menus: any[]) {
  const leftKeys: number[] = [];
  const _recurseGetLef = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.children) {
        _recurseGetLef(menu.children);
      } else {
        leftKeys.push(menu.id);
      }
    }
  };
  _recurseGetLef(menus);
  return leftKeys;
}
export { firstMenu };
