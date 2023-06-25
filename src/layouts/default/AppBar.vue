<script lang="ts" setup>
import { useAuthStore } from "@/store/auth";
import { computed } from "vue";
import menuData from "@/data/menu.data";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const drawer = ref(false);
const authStore = useAuthStore();
const router = useRouter();

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
  const result = await authStore.logout();
  if (result) {
    await router.push("/auth/signin");
  } else {
    alert("로그아웃에 실패하였습니다.");
  }
};
</script>
<template>
  <v-navigation-drawer v-model="drawer" permanent>
    <v-list>
      <v-list-item
        v-for="item in menuData"
        :key="item.title"
        :to="item.to"
        link
      >
        <v-list-item-content class="menu-item">
          <Icon class="menu-icon" :icon="item.icon"></Icon>
          <span>{{ item.title }}</span>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar color="info">
    <slot name="prepend">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon
    ></slot>
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
<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 11pt;
}

.menu-icon {
  margin-right: 10px;
}
</style>
