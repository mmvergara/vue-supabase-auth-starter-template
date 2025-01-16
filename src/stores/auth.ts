import { defineStore } from "pinia";
import { ref } from "vue";
import type { Session } from "@supabase/supabase-js";
import supabase from "../supabase";

export const useAuthStore = defineStore("auth", () => {
  const session = ref<Session | null>(null);
  const isLoading = ref(true);

  function initializeAuthListener() {
    const authListener = supabase.auth.onAuthStateChange(
      async (_, newSession) => {
        session.value = newSession;
        isLoading.value = false;
      }
    );

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }

  function setSession(newSession: Session | null) {
    console.log("setSession", newSession);
    session.value = newSession;
  }

  return {
    session,
    isLoading,
    initializeAuthListener,
    setSession,
  };
});
