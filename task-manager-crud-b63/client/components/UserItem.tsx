import { User } from "@/services/api";
import { Edit2, Trash2 } from "lucide-react";

interface UserItemProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function UserItem({ user, onEdit, onDelete, isLoading = false }: UserItemProps) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await onDelete(user.id);
      } catch (err) {
        console.error("Failed to delete user:", err);
      }
    }
  };

  return (
    <tr className="border-b border-border hover:bg-secondary/50 transition-colors">
      <td className="px-4 py-3 text-sm text-foreground">{user.name}</td>
      <td className="px-4 py-3 text-sm text-muted-foreground">{user.email}</td>
      <td className="px-4 py-3 text-sm">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            user.role === "admin"
              ? "bg-primary/10 text-primary"
              : "bg-secondary text-foreground"
          }`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(user)}
            disabled={isLoading}
            className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-primary/10 disabled:opacity-50"
            aria-label="Edit user"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded hover:bg-destructive/10 disabled:opacity-50"
            aria-label="Delete user"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
