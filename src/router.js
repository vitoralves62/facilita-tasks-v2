import Vue from "vue";
import Router from 'vue-router';
import LoginPage from "./views/Login/LoginPage.vue";
import DashboardPage from "./views/Dashboard/Home/DashboardPage.vue";
import { useUserStore } from './Stores/userStore';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/Dashboard',
            name: 'Dashboard',
            component: DashboardPage,
            meta: { requiresAuth: true }
        }
    ]
});

let piniaInitialized = false;

router.beforeEach((to, from, next) => {
    const pinia = router.app.$pinia;

    if (!pinia) {
        console.log('Pinia não foi inicializado corretamente.');
        if (to.name !== 'Login') {
            next({ name: 'Login' });
        } else {
            next();
        }
        return;
    }

    // O Pinia está inicializado
    if (!piniaInitialized) {
        piniaInitialized = true;
        console.log("Pinia foi inicializado");
    }

    const userStore = useUserStore(pinia);

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!userStore.user) {
            next({ name: 'Login' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
