import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GamePlay from '@/components/menu/GamePlay.vue'
import GameMenu from '@/components/menu/GameMenu.vue'

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
        path: '/burgerMenu',
        name: 'burgerMenu',
        component: GameMenu,
    },
    {
        path: '/burgergame/:burgerId',
        name: 'burgergame',
        component: GamePlay,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
