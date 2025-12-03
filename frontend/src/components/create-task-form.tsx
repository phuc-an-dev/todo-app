import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateTask } from "@/hooks/use-tasks";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const createTask = useCreateTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      createTask.mutate(
        { title: title.trim() },
        {
          onSuccess: () => {
            setTitle("");
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
        disabled={createTask.isPending}
      />
      <Button
        type="submit"
        disabled={!title.trim() || createTask.isPending}
        className="flex-shrink-0"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Task
      </Button>
    </form>
  );
}
