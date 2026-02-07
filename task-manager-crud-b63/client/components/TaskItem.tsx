import { Task } from "@/services/api";
import { Check, Trash2 } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function TaskItem({
  task,
  onToggle,
  onDelete,
  isLoading = false,
}: TaskItemProps) {
  const handleToggle = async () => {
    try {
      await onToggle(task.id, !task.completed);
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await onDelete(task.id);
      } catch (err) {
        console.error("Failed to delete task:", err);
      }
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
        task.completed
          ? "bg-secondary border-border opacity-60"
          : "bg-card border-border hover:border-primary/50"
      }`}
    >
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          task.completed
            ? "bg-primary border-primary text-primary-foreground"
            : "border-muted-foreground hover:border-primary"
        } disabled:opacity-50`}
      >
        {task.completed && <Check className="w-4 h-4" />}
      </button>

      <span
        className={`flex-1 text-sm sm:text-base transition-all ${
          task.completed
            ? "line-through text-muted-foreground"
            : "text-foreground"
        }`}
      >
        {task.title}
      </span>

      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="flex-shrink-0 p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded hover:bg-destructive/10 disabled:opacity-50"
        aria-label="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
