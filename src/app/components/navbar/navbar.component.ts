import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../store/auth/auth.actions';
import { selectCurrentUser, selectIsAdmin } from '../../store/auth/auth.selectors';
import { selectCartItemCount } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentUser$;
  isAdmin$;
  cartItemCount$;

  constructor(private store: Store) {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.cartItemCount$ = this.store.select(selectCartItemCount);
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
