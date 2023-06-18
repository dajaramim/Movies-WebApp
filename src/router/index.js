// Composables
import { createRouter, createWebHistory } from 'vue-router'
import MovieDetail from '@/views/MovieDetail.vue'
import ShowDetail from '@/views/ShowDetail.vue'
const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },

    ],

  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail,
  },
  {
    path: '/show/:id',
    name: 'ShowDetail',
    component: ShowDetail,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
