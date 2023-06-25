<script setup lang="ts">
import menuData from "@/data/menu.data";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const drawer = ref(false);
</script>
<template>
  <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="item in menuData"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <Icon :icon="item.icon"></Icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
