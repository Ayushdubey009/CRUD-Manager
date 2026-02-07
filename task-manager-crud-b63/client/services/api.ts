export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export const api = {
  // Tasks
  async fetchTasks(): Promise<Task[]> {
    const response = await fetch("/api/tasks");
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  },

  async createTask(title: string): Promise<Task> {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
  },

  async updateTask(id: string, updates: Partial<{ title: string; completed: boolean }>): Promise<Task> {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("Failed to update task");
    return response.json();
  },

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
  },

  // Users
  async fetchUsers(): Promise<User[]> {
    const response = await fetch("/api/users");
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
  },

  async createUser(name: string, email: string, role: "admin" | "user" = "user"): Promise<User> {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role }),
    });
    if (!response.ok) throw new Error("Failed to create user");
    return response.json();
  },

  async updateUser(id: string, updates: Partial<{ name: string; email: string; role: "admin" | "user" }>): Promise<User> {
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("Failed to update user");
    return response.json();
  },

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete user");
  },

  // Products
  async fetchProducts(): Promise<Product[]> {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  },

  async createProduct(
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string
  ): Promise<Product> {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, stock, category }),
    });
    if (!response.ok) throw new Error("Failed to create product");
    return response.json();
  },

  async updateProduct(
    id: string,
    updates: Partial<{ name: string; description: string; price: number; stock: number; category: string }>
  ): Promise<Product> {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("Failed to update product");
    return response.json();
  },

  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete product");
  },
};
