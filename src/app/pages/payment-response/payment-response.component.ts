import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PayphoneService } from '../../services/payphone.service';
import { createPurchase } from '../../store/purchases/purchases.actions';
import { clearCart } from '../../store/cart/cart.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-response',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './payment-response.component.html',
  styleUrls: ['./payment-response.component.scss']
})
export class PaymentResponseComponent implements OnInit {
  loading = true;
  success = false;
  message = 'Procesando tu pago...';
  transactionId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private payphoneService: PayphoneService
  ) {}

  async ngOnInit(): Promise<void> {
    // Obtener parámetros de la URL enviados por Payphone
    this.route.queryParams.subscribe(async (params) => {
      const id = params['id'];
      const clientTransactionId = params['clientTransactionId'];

      // Recuperar el transactionId guardado o usar el de la URL
      const transactionId = id || sessionStorage.getItem('pendingTransactionId') || clientTransactionId;

      if (transactionId) {
        this.transactionId = transactionId;
        await this.verifyAndCompletePurchase(transactionId);
      } else {
        this.loading = false;
        this.success = false;
        this.message = 'No se encontró información de la transacción.';
      }
    });
  }

  async verifyAndCompletePurchase(transactionId: string): Promise<void> {
    try {
      // Verificar el estado del pago con Payphone
      const paymentResponse = await this.payphoneService.verifyTransaction(transactionId);

      if (paymentResponse.status === 'Approved') {
        // Recuperar los datos de la compra pendiente
        const pendingPurchaseJson = sessionStorage.getItem('pendingPurchase');

        if (pendingPurchaseJson) {
          const pendingPurchase = JSON.parse(pendingPurchaseJson);

          // Crear la compra en el sistema
          this.store.dispatch(createPurchase({
            purchase: {
              userId: pendingPurchase.userId,
              items: pendingPurchase.items,
              total: pendingPurchase.total,
              paymentId: transactionId,
              status: 'aprobado'
            }
          }));

          // Limpiar el carrito
          this.store.dispatch(clearCart());

          // Limpiar datos temporales
          sessionStorage.removeItem('pendingPurchase');
          sessionStorage.removeItem('pendingTransactionId');

          this.success = true;
          this.message = '¡Pago realizado exitosamente!';

          // Redirigir al historial después de 3 segundos
          setTimeout(() => {
            this.router.navigate(['/historial']);
          }, 3000);
        } else {
          this.success = false;
          this.message = 'No se encontraron datos de la compra.';
        }
      } else if (paymentResponse.status === 'Declined') {
        this.success = false;
        this.message = 'El pago fue rechazado. ' + paymentResponse.message;
      } else {
        this.success = false;
        this.message = 'El pago está pendiente de confirmación.';
      }
    } catch (error) {
      console.error('Error verificando pago:', error);
      this.success = false;
      this.message = 'Hubo un error al verificar tu pago. Por favor, contacta con soporte.';
    } finally {
      this.loading = false;
    }
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  goToHistory(): void {
    this.router.navigate(['/historial']);
  }
}
