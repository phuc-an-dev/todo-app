type DateFilter = "today" | "this_week" | "this_month" | "all";

function getStartDate(filter: DateFilter, now: Date = new Date()): Date | null {
  if (filter === "all") {
    return null;
  }
  switch (filter) {
    case "today": {
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
    case "this_week": {
      const day = now.getDay();
      const diffToMonday = day === 0 ? -6 : 1 - day;
      const monday = new Date(now);
      monday.setDate(now.getDate() + diffToMonday);
      return new Date(
        monday.getFullYear(),
        monday.getMonth(),
        monday.getDate()
      );
    }
    case "this_month": {
      return new Date(now.getFullYear(), now.getMonth(), 1);
    }
  }
}

function getEndDate(filter: DateFilter, now: Date = new Date()): Date | null {
  if (filter === "all") {
    return null;
  }
  switch (filter) {
    case "today": {
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      end.setHours(23, 59, 59, 999);
      return end;
    }
    case "this_week": {
      const day = now.getDay();
      const diffToSunday = day === 0 ? 0 : 7 - day;
      const sunday = new Date(now);
      sunday.setDate(now.getDate() + diffToSunday);
      sunday.setHours(23, 59, 59, 999);
      return sunday;
    }
    case "this_month": {
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      lastDay.setHours(23, 59, 59, 999);
      return lastDay;
    }
  }
}

function getDateRange(
  filter: DateFilter,
  now: Date = new Date()
): {
  start: Date | null;
  end: Date | null;
} {
  return {
    start: getStartDate(filter, now),
    end: getEndDate(filter, now),
  };
}

export { getStartDate, getEndDate, getDateRange, type DateFilter };
