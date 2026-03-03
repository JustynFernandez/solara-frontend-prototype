import { create } from "zustand";
import { persist } from "zustand/middleware";

type SavedHelpersState = {
  savedHelpers: string[];
  toggleSavedHelper: (id: string) => void;
  isSaved: (id: string) => boolean;
  clearSavedHelpers: () => void;
};

export const useSavedHelpersStore = create<SavedHelpersState>()(
  persist(
    (set, get) => ({
      savedHelpers: [],
      toggleSavedHelper: (id) =>
        set((state) => ({
          savedHelpers: state.savedHelpers.includes(id)
            ? state.savedHelpers.filter((savedId) => savedId !== id)
            : [...state.savedHelpers, id],
        })),
      isSaved: (id) => get().savedHelpers.includes(id),
      clearSavedHelpers: () => set({ savedHelpers: [] }),
    }),
    { name: "solara.savedHelpers.v1" }
  )
);
