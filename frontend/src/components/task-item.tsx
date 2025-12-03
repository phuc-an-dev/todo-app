import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDeleteTask, useUpdateTask } from "@/hooks/use-tasks";
import { formatDateTime } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { TASK_STATUS, type Task } from "@/types/task.types";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const isCompleted = task.status === TASK_STATUS.COMPLETED;

  const handleToggleComplete = () => {
    updateTask.mutate({
      id: task._id,
      payload: {
        status: isCompleted ? TASK_STATUS.ACTIVE : TASK_STATUS.COMPLETED,
      },
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      updateTask.mutate({
        id: task._id,
        payload: { title: editTitle.trim() },
      });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask.mutate(task._id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggleComplete}
          disabled={updateTask.isPending}
          className={cn(
            "mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
            isCompleted
              ? "bg-neutral-200 border-none hover:bg-neutral-400"
              : "border-neutral-300 hover:border-blue-300"
          )}
        >
          {isCompleted && <Check className="w-3 h-3 text-white" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="h-8"
              />
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 flex-shrink-0"
                onClick={handleSaveEdit}
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 flex-shrink-0"
                onClick={handleCancelEdit}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <h3
                className={cn(
                  "text-base font-medium break-words",
                  isCompleted && "line-through text-gray-500"
                )}
              >
                {task.title}
              </h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge
                  variant={isCompleted ? "secondary" : "outline"}
                  className="text-xs"
                >
                  {isCompleted ? "Completed" : "Active"}
                </Badge>
                <span className="text-xs text-gray-500">
                  Created: {formatDateTime(task.createdAt)}
                </span>
                {task.completedAt && (
                  <span className="text-xs text-green-600">
                    Completed: {formatDateTime(task.completedAt)}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-neutral-500 hover:text-sky-700 hover:bg-sky-50"
              onClick={handleEdit}
              disabled={updateTask.isPending}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-neutral-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleDelete}
              disabled={deleteTask.isPending}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
