import { API_BASE_URL } from '../config';

export type Product = {
    id: number;
    title: string;
    description?: string;
    price: number;
    imageUrl?: string;
    createdAt?: string;
};

// GET /products
export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) throw new Error('Error fetching products');
    return res.json();
}

// POST /products
export async function createProduct(payload: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Error creating product');
    return res.json();
}
