export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

let products: Map<string, Product> = new Map();

export const productModel = {
  create: (
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string
  ): Product => {
    const id = Date.now().toString();
    const product: Product = {
      id,
      name,
      description,
      price,
      stock,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    products.set(id, product);
    return product;
  },

  getAll: (): Product[] => {
    return Array.from(products.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  },

  getById: (id: string): Product | undefined => {
    return products.get(id);
  },

  update: (id: string, updates: Partial<Omit<Product, "id" | "createdAt">>): Product | null => {
    const product = products.get(id);
    if (!product) return null;

    const updated: Product = {
      ...product,
      ...updates,
      updatedAt: new Date(),
    };
    products.set(id, updated);
    return updated;
  },

  delete: (id: string): boolean => {
    return products.delete(id);
  },
};
