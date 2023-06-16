<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { ref, reactive, watch } from "vue";

const authStore = useAuthStore();
const router = useRouter();
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const formData = reactive({
  email: "",
  password: "",
  passwordConfirm: "",
});

watch(
  () => authStore.user,
  (user) => {
    if (user) {
      router.push("/");
    }
  }
);

const signup = async () => {
  if (!formData.email || !formData.password) {
    return;
  }

  await authStore.signup(formData.email, formData.password);
};
</script>
<template>
  <v-card min-width="400">
    <v-card-title class="text-center">회원가입</v-card-title>
    <v-card-subtitle class="text-center">회원가입하세요.</v-card-subtitle>
    <v-card-text>
      <v-form>
        <v-text-field
          variant="underlined"
          label="이메일"
          v-model="formData.email"
          :rules="[
            (v) => !!v || '이메일을 입력해주세요.',
            (v) => /.+@.+/.test(v) || '이메일 형식이 올바르지 않습니다.',
          ]"
        />
        <v-text-field
          variant="underlined"
          label="비밀번호"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          v-model="formData.password"
          :rules="[(v) => !!v || '비밀번호를 입력해주세요.']"
        />
        <v-text-field
          variant="underlined"
          label="비밀번호 확인"
          :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPasswordConfirm ? 'text' : 'password'"
          @click:append="showPasswordConfirm = !showPasswordConfirm"
          v-model="formData.passwordConfirm"
          :rules="[
            (v) => v === formData.password || '비밀번호가 일치하지 않습니다.',
          ]"
        />
      </v-form>
    </v-card-text>

    <div class="text-center">
      <a href="/auth/signin">이미 회원이신가요?</a>
    </div>

    <v-card-actions class="d-flex justify-center">
      <v-btn variant="elevated" color="success" @click="signup">회원가입</v-btn>
    </v-card-actions>
  </v-card>
</template>
