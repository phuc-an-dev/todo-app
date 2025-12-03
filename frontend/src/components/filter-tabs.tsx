import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/stores/use-filter-store";
import type { DateFilter } from "@/types/task.types";
import { Calendar, CalendarDays, CalendarRange, Infinity } from "lucide-react";

const filters: { value: DateFilter; label: string; icon: any }[] = [
  { value: "today", label: "Today", icon: Calendar },
  { value: "week", label: "This Week", icon: CalendarDays },
  { value: "month", label: "This Month", icon: CalendarRange },
  { value: "all", label: "All Time", icon: Infinity },
];

export function FilterTabs() {
  const { filter, setFilter } = useFilterStore();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((item) => {
        const Icon = item.icon;
        const isActive = filter === item.value;

        return (
          <Button
            key={item.value}
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter(item.value)}
            className={cn("flex-shrink-0", !isActive && "hover:bg-gray-100")}
          >
            <Icon className="w-4 h-4 mr-2" />
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}
