import { useState } from "react";
import { User } from "@/services/api";
import { Plus, X } from "lucide-react";

interface UserFormProps {
  user?: User;
  onSubmit: (data: { name: string; email: string; role: "admin" | "user" }) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function UserForm({ user, onSubmit, onCancel, isLoading = false }: UserFormProps) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState<"admin" | "user">(user?.role || "user");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      await onSubmit({ name: name.trim(), email: email.trim(), role });
      if (!user) {
        setName("");
        setEmail("");
        setRole("user");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          disabled={isLoading}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          disabled={isLoading}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "admin" | "user")}
          disabled={isLoading}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium"
        >
          {user ? "Update User" : <Plus className="w-4 h-4" />}
          {user ? "Update" : "Add User"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}
