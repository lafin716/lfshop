<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { reactive, watch } from "vue";

const authStore = useAuthStore();
const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
});

watch(
  () => authStore.user,
  (user) => {
    if (user) {
      router.push("/");
    }
  }
);

const login = async () => {
  if (!formData.email || !formData.password) {
    return;
  }

  await authStore.login(formData.email, formData.password);
};

const googleLogin = async () => {
  await authStore.loginWithGoogle();
};
</script>
<template>
  <v-card min-width="400">
    <v-card-title class="text-center">로그인</v-card-title>
    <v-card-subtitle class="text-center">로그인을 해주세요.</v-card-subtitle>
    <v-card-text>
      <v-form>
        <v-text-field
          variant="underlined"
          label="이메일"
          v-model="formData.email"
        />
        <v-text-field
          variant="underlined"
          label="비밀번호"
          v-model="formData.password"
        />
      </v-form>
    </v-card-text>

    <div class="text-center">
      <a href="/auth/signup">회원가입</a>
    </div>

    <v-card-actions class="d-flex justify-center">
      <v-btn variant="elevated" color="success" @click="login">로그인</v-btn>
    </v-card-actions>

    <v-divider class="w-90"></v-divider>

    <v-card-actions class="d-flex justify-center py-4">
      <v-btn icon variant="elevated" @click="googleLogin">
        <Icon icon="logos:google-icon" width="30px" height="30px" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
