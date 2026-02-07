import { RequestHandler } from "express";
import { userModel } from "../models/user";

export const createUser: RequestHandler = (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res.status(400).json({ message: "Name is required and must be a non-empty string" });
      return;
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      res.status(400).json({ message: "Email is required and must be a non-empty string" });
      return;
    }

    const validRoles = ["admin", "user"];
    const userRole = validRoles.includes(role) ? role : "user";

    const user = userModel.create(name.trim(), email.trim(), userRole);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const getUsers: RequestHandler = (_req, res) => {
  try {
    const users = userModel.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const updateUser: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const updates: any = {};
    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length === 0) {
        res.status(400).json({ message: "Name must be a non-empty string" });
        return;
      }
      updates.name = name.trim();
    }
    if (email !== undefined) {
      if (typeof email !== "string" || email.trim().length === 0) {
        res.status(400).json({ message: "Email must be a non-empty string" });
        return;
      }
      updates.email = email.trim();
    }
    if (role !== undefined) {
      const validRoles = ["admin", "user"];
      if (validRoles.includes(role)) {
        updates.role = role;
      }
    }

    const user = userModel.update(id, updates);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUser: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const deleted = userModel.delete(id);
    if (!deleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ message: "User deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
