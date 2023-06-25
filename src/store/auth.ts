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

  function checkAuth() {
    try {
      const storage = localStorage.getItem("user");
      if (storage) {
        const user = JSON.parse(storage);
        if (user) {
          isLogin.value = true;
          user.value = user;
          return true;
        }
      }

      return false;
    } catch (error: any) {
      console.log(error);
      alert(error.message);
      return false;
    }
  }

  function saveUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  function removeUser() {
    localStorage.removeItem("user");
  }

  async function signup(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (result.user) {
        saveUser(result.user);
        return true;
      }

      return false;
    } catch (error: FirebaseError | any) {
      console.log(error);
      alert(error.message);
      return false;
    }
  }

  async function login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      if (result.user) {
        saveUser(result.user);
        return true;
      }

      return false;
    } catch (error: FirebaseError | any) {
      console.log(error);
      alert(error.message);
      return false;
    }
  }

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      if (result.user) {
        saveUser(result.user);
        return true;
      }

      return false;
    } catch (error: FirebaseError | any) {
      console.log(error);
      alert(error.message);
      return false;
    }
  }

  async function logout() {
    await signOut(auth);
    removeUser();
    return true;
  }

  return {
    user,
    isLogin,
    signup,
    login,
    loginWithGoogle,
    logout,
    checkAuth,
  };
});
