import type { RouteRecordRaw } from 'vue-router';
import routes from '~pages';

const mainRouter: RouteRecordRaw = {
  path: '/',
  component: () => import('@/components/layouts/Home.vue'),
  children: routes,
};

export { mainRouter };
