export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

let users: Map<string, User> = new Map();

export const userModel = {
  create: (name: string, email: string, role: "admin" | "user" = "user"): User => {
    const id = Date.now().toString();
    const user: User = {
      id,
      name,
      email,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.set(id, user);
    return user;
  },

  getAll: (): User[] => {
    return Array.from(users.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  },

  getById: (id: string): User | undefined => {
    return users.get(id);
  },

  update: (id: string, updates: Partial<Omit<User, "id" | "createdAt">>): User | null => {
    const user = users.get(id);
    if (!user) return null;

    const updated: User = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };
    users.set(id, updated);
    return updated;
  },

  delete: (id: string): boolean => {
    return users.delete(id);
  },
};
