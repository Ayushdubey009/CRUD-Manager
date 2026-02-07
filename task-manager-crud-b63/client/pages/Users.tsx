import { useEffect, useState } from "react";
import { UserForm } from "@/components/UserForm";
import { UserItem } from "@/components/UserItem";
import { api, User } from "@/services/api";
import { Users as UsersIcon } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
      console.error("Error loading users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (data: {
    name: string;
    email: string;
    role: "admin" | "user";
  }) => {
    try {
      const newUser = await api.createUser(data.name, data.email, data.role);
      setUsers((prev) => [newUser, ...prev]);
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to create user");
    }
  };

  const handleUpdateUser = async (data: {
    name: string;
    email: string;
    role: "admin" | "user";
  }) => {
    if (!editingUser) return;
    try {
      const updated = await api.updateUser(editingUser.id, data);
      setUsers((prev) =>
        prev.map((user) => (user.id === editingUser.id ? updated : user))
      );
      setEditingUser(null);
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update user");
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await api.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Users Management
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Create, edit, and manage user accounts
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
              <UserForm
                user={editingUser || undefined}
                onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
                onCancel={editingUser ? () => setEditingUser(null) : undefined}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Users List Section */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              {isLoading && users.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-border border-t-primary rounded-full" />
                </div>
              ) : users.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <UsersIcon className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No users yet
                  </h3>
                  <p className="text-muted-foreground text-center max-w-sm">
                    Create your first user using the form on the left.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary border-b border-border">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                          Role
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <UserItem
                          key={user.id}
                          user={user}
                          onEdit={setEditingUser}
                          onDelete={handleDeleteUser}
                          isLoading={isLoading}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
