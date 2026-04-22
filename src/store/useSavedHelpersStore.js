import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useSavedHelpersStore = create()(persist((set, get) => ({
    savedHelpers: [],
    toggleSavedHelper: (id) => set((state) => ({
        savedHelpers: state.savedHelpers.includes(id)
            ? state.savedHelpers.filter((savedId) => savedId !== id)
            : [...state.savedHelpers, id],
    })),
    isSaved: (id) => get().savedHelpers.includes(id),
    clearSavedHelpers: () => set({ savedHelpers: [] }),
}), { name: "solara.savedHelpers.v1" }));
