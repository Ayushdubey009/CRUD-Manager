import { useEffect, useState } from "react";
import { ProductForm } from "@/components/ProductForm";
import { ProductItem } from "@/components/ProductItem";
import { api, Product } from "@/services/api";
import { Package } from "lucide-react";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
      console.error("Error loading products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async (data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
  }) => {
    try {
      const newProduct = await api.createProduct(
        data.name,
        data.description,
        data.price,
        data.stock,
        data.category
      );
      setProducts((prev) => [newProduct, ...prev]);
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to create product");
    }
  };

  const handleUpdateProduct = async (data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
  }) => {
    if (!editingProduct) return;
    try {
      const updated = await api.updateProduct(editingProduct.id, data);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id ? updated : product
        )
      );
      setEditingProduct(null);
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update product");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await api.deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
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
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Products Management
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage your product inventory and catalog
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
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <ProductForm
                product={editingProduct || undefined}
                onSubmit={
                  editingProduct
                    ? handleUpdateProduct
                    : handleCreateProduct
                }
                onCancel={
                  editingProduct ? () => setEditingProduct(null) : undefined
                }
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Products List Section */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              {isLoading && products.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-border border-t-primary rounded-full" />
                </div>
              ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <Package className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No products yet
                  </h3>
                  <p className="text-muted-foreground text-center max-w-sm">
                    Add your first product using the form on the left.
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
                          Description
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                          Price
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                          Stock
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                          Category
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <ProductItem
                          key={product.id}
                          product={product}
                          onEdit={setEditingProduct}
                          onDelete={handleDeleteProduct}
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
