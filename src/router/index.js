import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GamePlay from '@/components/menu/GamePlay.vue'
import BoardView from '../views/BoardView.vue'
import BoardDetail from '@/components/board/BoardDetail.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/burgergame/:burgerId',
        name: 'burgergame',
        component: GamePlay,
    },
    {
        path: '/board',
        name: 'board',
        component: BoardView,
    },
    {
        path: '/board/:id',
        name: 'board-detail',
        component: BoardDetail,
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
