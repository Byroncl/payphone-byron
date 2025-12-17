import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/cart/cart.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private store: Store) {}

  async addToCart(): Promise<void> {
    this.store.dispatch(addToCart({ product: this.product }));

    // Mostrar notificación de éxito
    await Swal.fire({
      title: 'Producto agregado',
      text: `${this.product.nombre} se ha agregado al carrito`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  }
}
