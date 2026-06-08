"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completed: Record<string, boolean>; // key: "team/tool/moduleId"
  bookmarks: string[];
  markComplete: (key: string) => void;
  markIncomplete: (key: string) => void;
  toggleBookmark: (key: string) => void;
  isComplete: (key: string) => boolean;
  isBookmarked: (key: string) => boolean;
  getTeamProgress: (team: string, totalModules: number) => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: {},
      bookmarks: [],
      markComplete: (key) =>
        set((s) => ({ completed: { ...s.completed, [key]: true } })),
      markIncomplete: (key) =>
        set((s) => {
          const c = { ...s.completed };
          delete c[key];
          return { completed: c };
        }),
      toggleBookmark: (key) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(key)
            ? s.bookmarks.filter((b) => b !== key)
            : [...s.bookmarks, key],
        })),
      isComplete: (key) => !!get().completed[key],
      isBookmarked: (key) => get().bookmarks.includes(key),
      getTeamProgress: (team, total) => {
        if (total === 0) return 0;
        const done = Object.keys(get().completed).filter(
          (k) => k.startsWith(team) && get().completed[k]
        ).length;
        return Math.round((done / total) * 100);
      },
    }),
    { name: "cybersec-progress" }
  )
);
