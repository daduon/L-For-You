import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginRoutes from "./log-route";
import { Auth } from "../shared/utils";
// localStorage.setItem("authToken","hello");
localStorage.clear();
const routes: Array<RouteRecordRaw> = [
    ...LoginRoutes,
    {
        path: "/",
        name: "dashboard",
        component: () => import(/* webpackChunkName: "Dashboard" */ "../components/dashboard/Dashboard.vue"),
        meta: { requiresAuth: true },
        redirect: "/home",
        children: [
            {
                path: "/home",
                name: "home",
                component: () => import(/* webpackChunkName: "Home" */ "../views/home/Home.vue"),
            },
            {
                path: "/about",
                name: "about",
                component: () => import(/* webpackChunkName: "About" */ "../views/about/About.vue"),
            }
        ]
    },
     // Catch-all route for 404
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import(/* webpackChunkName: "Page404" */ "../components/page404/Page404.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {

    if (to.meta.requiresAuth && !Auth.isAuthenticated) {
        next({ name: "login" });
        
    } else if ((to.path === "/login") && Auth.isAuthenticated) {
        next({ name: "dashboard" });
    } 
    // Otherwise, allow the route navigation
    else {
        next();
    }
});

export default router;