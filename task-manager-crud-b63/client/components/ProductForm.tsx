import { useState } from "react";
import { Product } from "@/services/api";
import { Plus, X } from "lucide-react";

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
  }) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function ProductForm({
  product,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProductFormProps) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [stock, setStock] = useState(product?.stock?.toString() || "");
  const [category, setCategory] = useState(product?.category || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      setError("Price must be a valid positive number");
      return;
    }

    const stockNum = parseInt(stock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      setError("Stock must be a valid positive number");
      return;
    }

    if (!category.trim()) {
      setError("Category is required");
      return;
    }

    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        price: priceNum,
        stock: stockNum,
        category: category.trim(),
      });
      if (!product) {
        setName("");
        setDescription("");
        setPrice("");
        setStock("");
        setCategory("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Product Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Wireless Headphones"
          disabled={isLoading}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description..."
          rows={3}
          disabled={isLoading}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            disabled={isLoading}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Stock
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            min="0"
            disabled={isLoading}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Category
        </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Electronics"
          disabled={isLoading}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium"
        >
          {product ? "Update Product" : <Plus className="w-4 h-4" />}
          {product ? "Update" : "Add Product"}
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
