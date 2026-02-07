export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory storage for tasks
let tasks: Map<string, Task> = new Map();

export const taskModel = {
  create: (title: string): Task => {
    const id = Date.now().toString();
    const task: Task = {
      id,
      title,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tasks.set(id, task);
    return task;
  },

  getAll: (): Task[] => {
    return Array.from(tasks.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  },

  getById: (id: string): Task | undefined => {
    return tasks.get(id);
  },

  update: (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>): Task | null => {
    const task = tasks.get(id);
    if (!task) return null;

    const updated: Task = {
      ...task,
      ...updates,
      updatedAt: new Date(),
    };
    tasks.set(id, updated);
    return updated;
  },

  delete: (id: string): boolean => {
    return tasks.delete(id);
  },
};
