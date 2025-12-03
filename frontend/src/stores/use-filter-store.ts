import type { DateFilter } from "@/types/task.types";
import { create } from "zustand";

interface FilterStore {
  filter: DateFilter;
  setFilter: (filter: DateFilter) => void;
}

const useFilterStore = create<FilterStore>((set) => ({
  filter: "today",
  setFilter: (filter: DateFilter) => set({ filter }),
}));

export { useFilterStore };
