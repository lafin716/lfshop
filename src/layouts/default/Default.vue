<template>
  <v-app>
    <default-bar />
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/store/auth";
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import { useRouter } from "vue-router";
import { watchEffect } from "vue";

const authStore = useAuthStore();
const router = useRouter();
watchEffect(() => {
  if (!authStore.user) {
    router.push("/auth/signin");
  }
});
</script>
