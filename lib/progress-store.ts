"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

function todayStr() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

interface ProgressState {
  completed: Record<string, boolean>; // key: "team/tool/moduleId"
  bookmarks: string[];
  favorites: { url: string; title: string; cat: string }[];
  activeDays: string[]; // ziyaret edilen günler (YYYY-MM-DD)
  markComplete: (key: string) => void;
  markIncomplete: (key: string) => void;
  toggleBookmark: (key: string) => void;
  isComplete: (key: string) => boolean;
  isBookmarked: (key: string) => boolean;
  getTeamProgress: (team: string, totalModules: number) => number;
  recordVisit: () => void;
  getStreak: () => number;
  completedCount: () => number;
  toggleFavorite: (fav: { url: string; title: string; cat: string }) => void;
  isFavorite: (url: string) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: {},
      bookmarks: [],
      favorites: [],
      activeDays: [],
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
      completedCount: () =>
        Object.values(get().completed).filter(Boolean).length,
      toggleFavorite: (fav) =>
        set((s) => ({
          favorites: s.favorites.some((f) => f.url === fav.url)
            ? s.favorites.filter((f) => f.url !== fav.url)
            : [...s.favorites, fav],
        })),
      isFavorite: (url) => get().favorites.some((f) => f.url === url),
      recordVisit: () =>
        set((s) => {
          const t = todayStr();
          if (s.activeDays.includes(t)) return s;
          return { activeDays: [...s.activeDays, t].slice(-400) };
        }),
      getStreak: () => {
        const days = new Set(get().activeDays);
        let streak = 0;
        const d = new Date();
        // Bugün yoksa dünden başlamayı dene (streak kopmasın)
        if (!days.has(d.toISOString().slice(0, 10))) {
          d.setDate(d.getDate() - 1);
        }
        while (days.has(d.toISOString().slice(0, 10))) {
          streak++;
          d.setDate(d.getDate() - 1);
        }
        return streak;
      },
    }),
    { name: "cybersec-progress" }
  )
);
