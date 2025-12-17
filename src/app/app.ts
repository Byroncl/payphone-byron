import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUserFromSession } from './store/auth/auth.actions';
import { loadCartFromSession } from './store/cart/cart.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    // Cargar usuario y carrito desde sessionStorage al iniciar la app
    this.store.dispatch(loadUserFromSession());
    this.store.dispatch(loadCartFromSession());
  }
}
