export interface Product {
    id?: number;
    created_at?: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    category: string;
    availability: boolean;
  }
  