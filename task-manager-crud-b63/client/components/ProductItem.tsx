import { Product } from "@/services/api";
import { Edit2, Trash2 } from "lucide-react";

interface ProductItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function ProductItem({
  product,
  onEdit,
  onDelete,
  isLoading = false,
}: ProductItemProps) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await onDelete(product.id);
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  return (
    <tr className="border-b border-border hover:bg-secondary/50 transition-colors">
      <td className="px-4 py-3 text-sm text-foreground font-medium">
        {product.name}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs truncate">
        {product.description}
      </td>
      <td className="px-4 py-3 text-sm text-foreground font-medium">
        ${product.price.toFixed(2)}
      </td>
      <td className="px-4 py-3 text-sm">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            product.stock > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.stock} in stock
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-foreground">
        <span className="inline-flex items-center px-2 py-1 rounded bg-secondary text-foreground text-xs">
          {product.category}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(product)}
            disabled={isLoading}
            className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded hover:bg-primary/10 disabled:opacity-50"
            aria-label="Edit product"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded hover:bg-destructive/10 disabled:opacity-50"
            aria-label="Delete product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
