const routes = [
  {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "/home", component: () => import("pages/HomePage.vue") }],
  },
  {
    path: "/users",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "/users", component: () => import("pages/UsersPage.vue") }],
  },
  {
    path: "/clubs",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "/clubs", component: () => import("pages/ClubsPage.vue") }],
  },
  { path: '/', component:()=> import('pages/LoginPage.vue')},
  { path: '/login', component:()=> import('pages/LoginPage.vue')},
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
