import { ref } from "vue";
import { defineStore } from "pinia";
import { auth } from "@/plugins/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isLogin = ref<Boolean>(false);

  onAuthStateChanged(auth, (u) => {
    isLogin.value = !!u;
    user.value = u;
  });

  async function signup(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
    } catch (error: FirebaseError | any) {
      console.log(error.code);
      alert(error.message);
    }
  }

  async function login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
    } catch (error: FirebaseError | any) {
      console.log(error.code);
      alert(error.message);
    }
  }

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error: FirebaseError | any) {
      console.log(error.code);
      alert(error.message);
    }
  }

  async function logout() {
    await signOut(auth);
  }

  return {
    user,
    isLogin,
    signup,
    login,
    loginWithGoogle,
    logout,
  };
});
