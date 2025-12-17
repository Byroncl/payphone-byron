export interface Purchase {
  id: number;
  userId: number;
  items: PurchaseItem[];
  total: number;
  paymentId: string;
  status: 'pendiente' | 'aprobado' | 'rechazado';
  createdAt: string;
}

export interface PurchaseItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface PurchaseState {
  purchases: Purchase[];
  loading: boolean;
  error: string | null;
}
