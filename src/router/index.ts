import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'; //导入类型，type只是让它看起来容易分辨
import LocalCache from '@/util/cache.ts';
import { firstMenu } from '@/util/map-menus';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    //根据userMenus，动态定义路由
    children: []
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

//导航守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    //判断是否登录过
    const token = LocalCache.getCache('token');
    if (!token) {
      return '/login';
    }
  }
  if (to.path === '/main') {
    console.log('??', firstMenu.url);

    return firstMenu.url;
  }
});

export default router;
