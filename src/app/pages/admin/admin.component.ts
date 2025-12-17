import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DatabaseService } from '../../services/database.service';
import { loadAllPurchases, updatePurchaseStatus } from '../../store/purchases/purchases.actions';
import { selectAllPurchases } from '../../store/purchases/purchases.selectors';
import { User } from '../../models/user.model';
import { Purchase } from '../../models/purchase.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  currentView = signal<'dashboard' | 'users' | 'purchases'>('dashboard');

  stats = signal({
    totalUsuarios: 0,
    totalCompras: 0,
    ventasTotales: 0,
    comprasPendientes: 0
  });

  users = signal<User[]>([]);
  purchases$;

  constructor(
    private dbService: DatabaseService,
    private store: Store
  ) {
    this.purchases$ = this.store.select(selectAllPurchases);
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.stats.set(this.dbService.getDashboardStats());
    this.users.set(this.dbService.getAllUsers());
    this.store.dispatch(loadAllPurchases());
  }

  switchView(view: 'dashboard' | 'users' | 'purchases'): void {
    this.currentView.set(view);
    if (view === 'dashboard') {
      this.loadDashboardData();
    }
  }

  updateStatus(purchaseId: number, status: 'pendiente' | 'aprobado' | 'rechazado'): void {
    this.store.dispatch(updatePurchaseStatus({ purchaseId, status }));
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'aprobado':
        return 'status-approved';
      case 'pendiente':
        return 'status-pending';
      case 'rechazado':
        return 'status-rejected';
      default:
        return '';
    }
  }

  getUserById(userId: number): User | undefined {
    return this.users().find(u => u.id === userId);
  }
}
