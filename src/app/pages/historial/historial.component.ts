import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { selectAllPurchases, selectPurchasesLoading } from '../../store/purchases/purchases.selectors';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import { loadUserPurchases } from '../../store/purchases/purchases.actions';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  purchases$;
  loading$;
  currentUser$;

  constructor(private store: Store) {
    this.purchases$ = this.store.select(selectAllPurchases);
    this.loading$ = this.store.select(selectPurchasesLoading);
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.store.dispatch(loadUserPurchases({ userId: user.id }));
      }
    });
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

  getStatusText(status: string): string {
    switch (status) {
      case 'aprobado':
        return 'Aprobado';
      case 'pendiente':
        return 'Pendiente';
      case 'rechazado':
        return 'Rechazado';
      default:
        return status;
    }
  }
}
