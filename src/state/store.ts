import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  authToken?: string;
  setAuthToken: (authToken: string | undefined) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      authToken: undefined,
      setAuthToken: (authToken) => set({ authToken }),
    }),
    {
      name: "AppStore",
    }
  )
);
