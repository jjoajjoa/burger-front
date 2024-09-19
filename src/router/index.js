import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import FindAccountView from '../views/FindAccountView.vue'
import GamePlay from '@/components/menu/GamePlay.vue'
import MypageProfileView from '../views/MypageProfileView.vue'
import MypageBoardView from '../views/MypageBoardView.vue'
import BoardView from '../views/BoardView.vue'
import CreateBoardView from '../views/CreateBoardView.vue'
import BoardDetailView from '@/views/BoardDetailView.vue';

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
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUpView
    },
    {
        path: '/findaccount',
        name: 'findaccount',
        component: FindAccountView
    },
    {
        path: '/mypage',
        name: 'mypage',
        component: MypageProfileView
    },
    {
        path: '/myboard',
        name: 'myboard',
        component: MypageBoardView
    },
    {
        path: '/board',
        name: 'board',
        component: BoardView
    },
    {
        path: '/createboard',
        name: 'createboard',
        component: CreateBoardView
    },
    {
        path: '/board/:boardPk',
        name: 'BoardDetail',
        component: BoardDetailView,
        props: true,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
