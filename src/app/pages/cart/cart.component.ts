import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selectors';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cart/cart.actions';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import { createPurchase } from '../../store/purchases/purchases.actions';
import { PayphoneService } from '../../services/payphone.service';
import { PurchaseItem } from '../../models/purchase.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems$;
  cartTotal$;
  currentUser$;

  processing = false;

  constructor(
    private store: Store,
    private payphoneService: PayphoneService,
    private router: Router
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  updateQuantity(productId: number, quantity: number): void {
    this.store.dispatch(updateQuantity({ productId, quantity }));
  }

  async removeItem(productId: number): Promise<void> {
    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      text: '¿Estás seguro de que deseas eliminar este producto del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#667eea',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      this.store.dispatch(removeFromCart({ productId }));
      await Swal.fire({
        title: 'Eliminado',
        text: 'El producto ha sido eliminado del carrito',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    }
  }

  async checkout(): Promise<void> {
    this.processing = true;

    try {
      const cartItems = await new Promise<any[]>((resolve) => {
        this.cartItems$.subscribe(items => resolve(items)).unsubscribe();
      });

      if (cartItems.length === 0) {
        await Swal.fire({
          title: 'Carrito vacío',
          text: 'No tienes productos en tu carrito',
          icon: 'info',
          confirmButtonColor: '#667eea'
        });
        this.processing = false;
        return;
      }

      const total = await new Promise<number>((resolve) => {
        this.cartTotal$.subscribe(t => resolve(t)).unsubscribe();
      });

      const user = await new Promise<any>((resolve) => {
        this.currentUser$.subscribe(u => resolve(u)).unsubscribe();
      });

      // Mostrar loading
      Swal.fire({
        title: 'Procesando...',
        text: 'Generando link de pago con Payphone',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Guardar datos del carrito en sessionStorage para recuperarlos después del pago
      sessionStorage.setItem('pendingPurchase', JSON.stringify({
        userId: user.id,
        items: cartItems.map(item => ({
          productId: item.product.id,
          productName: item.product.nombre,
          quantity: item.quantity,
          price: item.product.precio
        })),
        total: total
      }));

      // Procesar pago con Payphone (redirigirá automáticamente)
      await this.payphoneService.processPayment(
        total,
        `Compra de ${cartItems.length} productos en Farmacia Online`,
        user.email
      );

      // Nota: El código siguiente no se ejecutará porque Payphone redirige al usuario
      // La compra se completará en el componente payment-response cuando el usuario regrese
    } catch (error: any) {
      console.error('Error en el checkout:', error);
      await Swal.fire({
        title: 'Error',
        text: error.message || 'Hubo un error al procesar tu compra. Por favor, intenta nuevamente.',
        icon: 'error',
        confirmButtonColor: '#667eea'
      });
    } finally {
      this.processing = false;
    }
  }
}
