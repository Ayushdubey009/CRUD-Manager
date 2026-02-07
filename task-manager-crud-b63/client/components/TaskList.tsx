import { Task } from "@/services/api";
import { TaskItem } from "./TaskItem";
import { ListTodo } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function TaskList({
  tasks,
  onToggle,
  onDelete,
  isLoading = false,
}: TaskListProps) {
  const completedCount = tasks.filter((t) => t.completed).length;

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <ListTodo className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No tasks yet
        </h3>
        <p className="text-muted-foreground text-center max-w-sm">
          Create your first task above to get started. Stay organized and
          productive!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-medium text-muted-foreground">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          {completedCount > 0 && (
            <span className="ml-2">
              • {completedCount} completed
            </span>
          )}
        </h2>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}
