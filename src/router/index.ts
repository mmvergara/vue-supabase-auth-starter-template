import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import SignInPage from "../views/auth/SignInPage.vue";
import SignUpPage from "../views/auth/SignUpPage.vue";
import ProtectedPage from "../views/ProtectedPage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import supabase from "../supabase";
import { Session } from "@supabase/supabase-js";
import { useAuthStore } from "../stores/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/auth/sign-in",
    component: SignInPage,
  },
  {
    path: "/auth/sign-up",
    component: SignUpPage,
  },
  {
    path: "/protected",
    component: ProtectedPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();
  let session: Session | null = null;
  await supabase.auth.getSession().then(({ data }) => {
    session = data.session;
    authStore.setSession(session);
  });
  if (to.meta.requiresAuth && !session) {
    next("/auth/sign-in");
  } else {
    next();
  }
});

export default router;
