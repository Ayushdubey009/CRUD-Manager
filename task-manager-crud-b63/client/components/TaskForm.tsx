import { useState } from "react";
import { Plus } from "lucide-react";

interface TaskFormProps {
  onSubmit: (title: string) => Promise<void>;
  isLoading?: boolean;
}

export function TaskForm({ onSubmit, isLoading = false }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = title.trim();
    if (!trimmed) {
      setError("Task title cannot be empty");
      return;
    }

    try {
      await onSubmit(trimmed);
      setTitle("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>Add</span>
        </button>
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </form>
  );
}
