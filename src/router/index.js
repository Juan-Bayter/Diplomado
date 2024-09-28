import { createRouter, createWebHistory } from 'vue-router';
import ListadoHoteles from '../views/ListadoHoteles.vue';  

const routes = [
    {
        path: '/',
        name: 'ListadoHoteles',
        component: ListadoHoteles,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
