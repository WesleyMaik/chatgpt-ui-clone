import { create } from "zustand";

interface UseAPIProps {
    api: string | undefined,
    setAPI: (key: string) => void
};

const initialApiState = import.meta.env.VITE_CHATGPT_SECRET_KEY || undefined;

export const useAPI = create<UseAPIProps>((set) => ({
    api: initialApiState,
    setAPI: async (key) => set({ api: key })
}));