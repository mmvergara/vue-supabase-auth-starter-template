<template>
  <main>
    <router-link class="home-link" to="/">◄ Home</router-link>
    <form class="main-container" @submit.prevent="handleSubmit">
      <h1 class="header-text">Sign In</h1>
      <input
        v-model="formValues.email"
        name="email"
        type="email"
        placeholder="Email"
      />
      <input
        v-model="formValues.password"
        name="password"
        type="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
      <router-link class="auth-link" to="/auth/sign-up">
        Don't have an account? Sign Up
      </router-link>
      <p v-if="error" style="color: red">{{ error }}</p>
    </form>
  </main>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import supabase from "../../supabase";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const error = ref("");
const formValues = reactive({
  email: "",
  password: "",
});

if (authStore.session) {
  router.push("/");
}

const handleSubmit = async () => {
  const res = await supabase.auth.signInWithPassword({
    email: formValues.email,
    password: formValues.password,
  });
  if (res.error) {
    error.value = res.error.message;
    return;
  }
  console.log(res);
  router.push("/");
};
</script>
