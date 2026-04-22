import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useLearnStore = create()(persist((set, get) => ({
    bookmarkedGuides: [],
    toggleBookmark: (slug) => set((state) => ({
        bookmarkedGuides: state.bookmarkedGuides.includes(slug)
            ? state.bookmarkedGuides.filter((s) => s !== slug)
            : [...state.bookmarkedGuides, slug],
    })),
    isBookmarked: (slug) => get().bookmarkedGuides.includes(slug),
    clearBookmarks: () => set({ bookmarkedGuides: [] }),
    completedGuides: [],
    markComplete: (slug) => set((state) => ({
        completedGuides: state.completedGuides.includes(slug)
            ? state.completedGuides
            : [...state.completedGuides, slug],
    })),
    unmarkComplete: (slug) => set((state) => ({
        completedGuides: state.completedGuides.filter((s) => s !== slug),
    })),
    isCompleted: (slug) => get().completedGuides.includes(slug),
    clearCompletedGuides: () => set({ completedGuides: [] }),
    lastViewedGuide: null,
    setLastViewedGuide: (slug) => set({ lastViewedGuide: slug }),
    readingProgress: {},
    setReadingProgress: (slug, progress) => set((state) => ({
        readingProgress: { ...state.readingProgress, [slug]: progress },
    })),
    getReadingProgress: (slug) => get().readingProgress[slug] ?? 0,
}), { name: "solara.learn.v1" }));
