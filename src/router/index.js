import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import UpdatedTable from '../views/UpdatedTable.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sorted-table',
    name: 'UpdatedTable',
    component: UpdatedTable,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
