import { RequestHandler } from "express";
import { productModel } from "../models/product";

export const createProduct: RequestHandler = (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res.status(400).json({ message: "Name is required and must be a non-empty string" });
      return;
    }

    if (!description || typeof description !== "string" || description.trim().length === 0) {
      res.status(400).json({ message: "Description is required and must be a non-empty string" });
      return;
    }

    if (typeof price !== "number" || price < 0) {
      res.status(400).json({ message: "Price must be a positive number" });
      return;
    }

    if (typeof stock !== "number" || stock < 0) {
      res.status(400).json({ message: "Stock must be a positive number" });
      return;
    }

    if (!category || typeof category !== "string" || category.trim().length === 0) {
      res.status(400).json({ message: "Category is required and must be a non-empty string" });
      return;
    }

    const product = productModel.create(
      name.trim(),
      description.trim(),
      price,
      stock,
      category.trim()
    );
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

export const getProducts: RequestHandler = (_req, res) => {
  try {
    const products = productModel.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const updateProduct: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    if (!id) {
      res.status(400).json({ message: "Product ID is required" });
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

    if (description !== undefined) {
      if (typeof description !== "string" || description.trim().length === 0) {
        res.status(400).json({ message: "Description must be a non-empty string" });
        return;
      }
      updates.description = description.trim();
    }

    if (price !== undefined) {
      if (typeof price !== "number" || price < 0) {
        res.status(400).json({ message: "Price must be a positive number" });
        return;
      }
      updates.price = price;
    }

    if (stock !== undefined) {
      if (typeof stock !== "number" || stock < 0) {
        res.status(400).json({ message: "Stock must be a positive number" });
        return;
      }
      updates.stock = stock;
    }

    if (category !== undefined) {
      if (typeof category !== "string" || category.trim().length === 0) {
        res.status(400).json({ message: "Category must be a non-empty string" });
        return;
      }
      updates.category = category.trim();
    }

    const product = productModel.update(id, updates);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }

    const deleted = productModel.delete(id);
    if (!deleted) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json({ message: "Product deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
