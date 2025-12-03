import { startOfDay, startOfWeek, startOfMonth, endOfDay } from "date-fns";
import type { DateFilter } from "@/types/task.types";

function getDateRange(filter: DateFilter) {
  const now = new Date();

  switch (filter) {
    case "today":
      return {
        start: startOfDay(now),
        end: endOfDay(now),
      };
    case "week":
      return {
        start: startOfWeek(now, { weekStartsOn: 1 }), // Monday
        end: endOfDay(now),
      };
    case "month":
      return {
        start: startOfMonth(now),
        end: endOfDay(now),
      };
    case "all":
    default:
      return {
        start: null,
        end: null,
      };
  }
}

function formatDate(date: Date | string | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatDateTime(date: Date | string | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export { getDateRange, formatDate, formatDateTime };
