import { RouteRecordRaw } from "vue-router";
const LoginRoutes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "login",
        component: () => import(/* webpackChunkName: "Login" */ "../views/log/Login.vue"),
    },
];
export default LoginRoutes;
