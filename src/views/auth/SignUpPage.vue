<template>
  <main>
    <router-link class="home-link" to="/">◄ Home</router-link>
    <form class="main-container" @submit.prevent="handleSubmit">
      <h1 class="header-text">Sign Up</h1>
      <p class="demo-text">
        Demo app, please don't use your real email or password
      </p>
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
      <button type="submit">Create Account</button>
      <router-link class="auth-link" to="/auth/sign-in">
        Already have an account? Sign In
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

if (authStore.session) {
  router.push("/");
}

const error = ref("");
const formValues = reactive({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  const res = await supabase.auth.signUp({
    email: formValues.email,
    password: formValues.password,
  });
  if (res.error) {
    error.value = res.error.message;
    return;
  }
  router.push("/auth/sign-in");
};
</script>
