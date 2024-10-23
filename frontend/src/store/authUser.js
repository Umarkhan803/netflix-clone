import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  // signup
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        credentials
      );
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Sign up fail");
      set({ isSigningUp: false, user: null });
    }
  },
  // login
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("log In success");
    } catch (error) {
      set({ isLoggingIn: false });
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  // logout

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("logged out Successfully");
    } catch (error) {
      set({ isLoggingOut: false });

      toast.error(error.response.data.message || "Logout fail");
    }
  },
  // auth checker
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/authCheck"
      );

      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
