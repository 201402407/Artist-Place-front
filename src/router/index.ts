import VueRouter, { RouteConfig } from "vue-router"
import Vue from "vue"
import Main from "@/views/main/index.vue"
import Home from "@/views/home/index.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: "/main",
        name: "Main",
        component: Main,
    },
    {
        path: "/",
        name: "Home",
        component: Home,
    },
]

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes,
})

export default router
