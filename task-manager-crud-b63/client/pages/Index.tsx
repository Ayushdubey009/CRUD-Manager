import { useEffect, useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { api, Task } from "@/services/api";
import { CheckCircle2 } from "lucide-react";

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
      console.error("Error loading tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (title: string) => {
    try {
      const newTask = await api.createTask(title);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to create task");
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      const updated = await api.updateTask(id, { completed });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updated : task))
      );
    } catch (err) {
      console.error("Error updating task:", err);
      throw err;
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Task Manager
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Stay organized and boost your productivity
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Task Form */}
        <div className="mb-8">
          <TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />
        </div>

        {/* Loading State */}
        {isLoading && tasks.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-border border-t-primary rounded-full" />
          </div>
        ) : (
          /* Task List */
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <TaskList
              tasks={tasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
