"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX = 6;

interface RecentSearchesState {
  items: string[];
  add: (term: string) => void;
  clear: () => void;
}

/** Persisted recent search terms for the search box. */
export const useRecentSearches = create<RecentSearchesState>()(
  persist(
    (set) => ({
      items: [],
      add: (term) =>
        set((state) => {
          const t = term.trim();
          if (!t) return state;
          const deduped = [t, ...state.items.filter((x) => x !== t)];
          return { items: deduped.slice(0, MAX) };
        }),
      clear: () => set({ items: [] }),
    }),
    { name: "sasteghar-recent-searches" }
  )
);
