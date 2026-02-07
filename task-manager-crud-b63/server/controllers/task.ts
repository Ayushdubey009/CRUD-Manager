import { RequestHandler } from "express";
import { taskModel } from "../models/task";

export const createTask: RequestHandler = (req, res) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      res.status(400).json({ message: "Title is required and must be a non-empty string" });
      return;
    }

    const task = taskModel.create(title.trim());
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

export const getTasks: RequestHandler = (_req, res) => {
  try {
    const tasks = taskModel.getAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

export const updateTask: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (!id) {
      res.status(400).json({ message: "Task ID is required" });
      return;
    }

    const updates: any = {};
    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length === 0) {
        res.status(400).json({ message: "Title must be a non-empty string" });
        return;
      }
      updates.title = title.trim();
    }
    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        res.status(400).json({ message: "Completed must be a boolean" });
        return;
      }
      updates.completed = completed;
    }

    const task = taskModel.update(id, updates);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const deleteTask: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Task ID is required" });
      return;
    }

    const deleted = taskModel.delete(id);
    if (!deleted) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.json({ message: "Task deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
