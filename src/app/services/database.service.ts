import { Injectable } from '@angular/core';
import { User, UserRegister } from '../models/user.model';
import { Purchase, PurchaseItem } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private users: User[] = [];
  private purchases: Purchase[] = [];
  private userIdCounter = 1;
  private purchaseIdCounter = 1;

  constructor() {
    this.initDatabase();
  }

  private initDatabase(): void {
    // Cargar datos desde localStorage si existen
    const savedUsers = localStorage.getItem('pharmacy_users');
    const savedPurchases = localStorage.getItem('pharmacy_purchases');
    const savedUserCounter = localStorage.getItem('pharmacy_user_counter');
    const savedPurchaseCounter = localStorage.getItem('pharmacy_purchase_counter');

    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
    if (savedPurchases) {
      this.purchases = JSON.parse(savedPurchases);
    }
    if (savedUserCounter) {
      this.userIdCounter = parseInt(savedUserCounter);
    }
    if (savedPurchaseCounter) {
      this.purchaseIdCounter = parseInt(savedPurchaseCounter);
    }

    // Crear usuario admin por defecto si no existe
    this.createDefaultAdmin();
  }

  private saveUsers(): void {
    localStorage.setItem('pharmacy_users', JSON.stringify(this.users));
    localStorage.setItem('pharmacy_user_counter', this.userIdCounter.toString());
  }

  private savePurchases(): void {
    localStorage.setItem('pharmacy_purchases', JSON.stringify(this.purchases));
    localStorage.setItem('pharmacy_purchase_counter', this.purchaseIdCounter.toString());
  }

  private createDefaultAdmin(): void {
    const adminExists = this.users.find(u => u.email === 'admin@farmacia.com');

    if (!adminExists) {
      this.users.push({
        id: this.userIdCounter++,
        email: 'admin@farmacia.com',
        password: 'admin123',
        nombre: 'Admin',
        apellido: 'Sistema',
        telefono: '0999999999',
        direccion: 'Farmacia Principal',
        tipo: 'admin',
        createdAt: new Date().toISOString()
      });
      this.saveUsers();
    }
  }

  // Métodos de Usuario
  registerUser(userData: UserRegister): User | null {
    try {
      // Verificar si el email ya existe
      const emailExists = this.users.find(u => u.email === userData.email);
      if (emailExists) {
        return null;
      }

      const newUser: User = {
        id: this.userIdCounter++,
        email: userData.email,
        password: userData.password,
        nombre: userData.nombre,
        apellido: userData.apellido,
        telefono: userData.telefono,
        direccion: userData.direccion,
        tipo: 'cliente',
        createdAt: new Date().toISOString()
      };

      this.users.push(newUser);
      this.saveUsers();
      return newUser;
    } catch (error) {
      console.error('Error registrando usuario:', error);
      return null;
    }
  }

  loginUser(email: string, password: string): User | null {
    try {
      const user = this.users.find(u => u.email === email && u.password === password);
      return user || null;
    } catch (error) {
      console.error('Error en login:', error);
      return null;
    }
  }

  getUserById(id: number): User | null {
    try {
      const user = this.users.find(u => u.id === id);
      return user || null;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }
  }

  getAllUsers(): User[] {
    try {
      return [...this.users].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      return [];
    }
  }

  // Métodos de Compras
  createPurchase(userId: number, items: PurchaseItem[], total: number, paymentId: string): Purchase | null {
    try {
      const newPurchase: Purchase = {
        id: this.purchaseIdCounter++,
        userId,
        items,
        total,
        paymentId,
        status: 'aprobado', // Por defecto aprobado ya que el pago fue exitoso
        createdAt: new Date().toISOString()
      };

      this.purchases.push(newPurchase);
      this.savePurchases();
      return newPurchase;
    } catch (error) {
      console.error('Error creando compra:', error);
      return null;
    }
  }

  getPurchaseById(id: number): Purchase | null {
    try {
      const purchase = this.purchases.find(p => p.id === id);
      return purchase || null;
    } catch (error) {
      console.error('Error obteniendo compra:', error);
      return null;
    }
  }

  getPurchasesByUserId(userId: number): Purchase[] {
    try {
      return [...this.purchases]
        .filter(p => p.userId === userId)
        .sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    } catch (error) {
      console.error('Error obteniendo compras del usuario:', error);
      return [];
    }
  }

  getAllPurchases(): Purchase[] {
    try {
      return [...this.purchases].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error('Error obteniendo todas las compras:', error);
      return [];
    }
  }

  updatePurchaseStatus(purchaseId: number, status: 'pendiente' | 'aprobado' | 'rechazado'): boolean {
    try {
      const purchase = this.purchases.find(p => p.id === purchaseId);
      if (purchase) {
        purchase.status = status;
        this.savePurchases();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error actualizando estado de compra:', error);
      return false;
    }
  }

  // Métodos para estadísticas del admin
  getDashboardStats(): {
    totalUsuarios: number;
    totalCompras: number;
    ventasTotales: number;
    comprasPendientes: number;
  } {
    try {
      const totalUsuarios = this.users.filter(u => u.tipo === 'cliente').length;
      const totalCompras = this.purchases.length;
      const ventasTotales = this.purchases
        .filter(p => p.status === 'aprobado')
        .reduce((sum, p) => sum + p.total, 0);
      const comprasPendientes = this.purchases.filter(p => p.status === 'pendiente').length;

      return {
        totalUsuarios,
        totalCompras,
        ventasTotales,
        comprasPendientes
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      return {
        totalUsuarios: 0,
        totalCompras: 0,
        ventasTotales: 0,
        comprasPendientes: 0
      };
    }
  }
}
