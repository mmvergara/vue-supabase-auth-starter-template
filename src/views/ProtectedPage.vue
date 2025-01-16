<template>
  <main>
    <router-link class="home-link" to="/">◄ Home</router-link>
    <section class="main-container">
      <h1 class="header-text">This is a Protected Page</h1>
      <p>Current User : {{ session?.user?.email || "None" }}</p>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const { session } = authStore;
</script>
