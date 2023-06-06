import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ViewtyBoardHome",
    component: () => import("../views/VuetifyDashView.vue"),
  },
  {
    path: "/ViewtyBoard",
    name: "ViewtyBoard",
    component: () => import("../views/VuetifyDashView.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/diagramm",
    name: "diagramm",
    component: () => import("../components/DiagrammChart.vue"),
  },
  {
    path: "/common",
    name: "commonView",
    component: () => import("../views/CommonExpenses.vue"),
  },
  {
    path: "/addExpense",
    name: "addExpensePage",
    component: () => import("../views/AddExpensePage.vue"),
  },
  {
    path: "/addExpense/:category",
    name: "addExpense",
    component: () => import("../components/ExpenseAdd.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/calculator",
    name: "calculator",
    component: () => import("../views/CalculatorView.vue"),
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/404View.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
