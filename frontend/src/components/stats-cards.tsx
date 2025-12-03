import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, ListTodo } from "lucide-react";

interface StatsCardsProps {
  total: number;
  active: number;
  completed: number;
}

export function StatsCards({ total, active, completed }: StatsCardsProps) {
  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: ListTodo,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Active",
      value: active,
      icon: Circle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
