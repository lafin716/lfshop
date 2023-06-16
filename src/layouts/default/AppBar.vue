<script lang="ts" setup>
import { useAuthStore } from "@/store/auth";
import { computed } from "vue";

const authStore = useAuthStore();

const initialName = computed(() => {
  const name = authStore.user?.email ?? "";
  return name.charAt(0);
});

const avatarUrl = computed(() => {
  return authStore.user?.photoURL ?? "";
});

const userEmail = computed(() => {
  return authStore.user?.email ?? "";
});

const logout = async () => {
  await authStore.logout();
};
</script>
<template>
  <v-app-bar color="info">
    <slot name="prepend">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </slot>
    <v-app-bar-title> 쇼핑몰관리자 </v-app-bar-title>
    <slot name="append">
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="surface-variant">
              <v-img
                v-if="avatarUrl !== ''"
                :src="avatarUrl"
                alt="Avatar Image"
              ></v-img>
              <span v-else class="text-h5">{{ initialName }}</span>
            </v-avatar>
          </v-btn>
        </template>

        <v-card>
          <v-card-text>
            <p class="mb-2">{{ userEmail }}</p>
            <v-divider></v-divider>
            <div class="d-flex flex-column text-center">
              <v-btn variant="text"> 계정설정 </v-btn>
              <v-btn variant="text" @click="logout"> 로그아웃 </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </slot>
  </v-app-bar>
</template>
