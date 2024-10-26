import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import DeskView from "@/views/DeskView.vue";
import DesksList from "@/views/DesksList.vue";


const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: DesksList
    },
    {
        path: "/desk",
        component: DeskView,
        props: (route) => ({
            deskId: route.query.deskId ?? ""
        }),
    },
]

const Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default Router;