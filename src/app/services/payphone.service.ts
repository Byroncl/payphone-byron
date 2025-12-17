import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

export interface PayphoneResponse {
  transactionId: string;
  status: 'Approved' | 'Declined' | 'Pending';
  amount: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PayphoneService {
  // En desarrollo usamos el proxy local (redirige /api a Payphone), en producción usar la URL directa
  private readonly PAYPHONE_DEV_URL = '';

  // Credenciales de Payphone
  private readonly PAYPHONE_TOKEN = 'BOuUrafvz62BuYpKosqJBkup5UbGMwKewHNKswj_f-O-vpBgu5wxOsrs7mg71QJcCJMud_NKUiKfFbSqX45_QO5kGPHUG7ifZGqwWNfwoIRrFZUjFFIMMXTYNwU1uoNq0CSR1m6YcrGGpknoiGcidMFMH8sU3YPr3CdMHjk0u3iVvQnNFc57FNQkWLQysYxWfVKeXwiWgfJAz8rSW_hIeNb8KgXJRvNkWN4If6OYpueDmmQnehzEVdwxd46Ey5u2J7Wh5xmxAFz33GfowbWVXMmSH_dEA48p5nca2zk83ucqJ9fEf0tfRWCnxunfish3eGGcdQ';
  private readonly STORE_ID = '1350967533';

  constructor() {}

  // Método real usando Payphone Link API
  async processPayment(amount: number, description: string, userEmail: string = 'cliente@farmacia.com'): Promise<PayphoneResponse> {
    // Convertir a centavos (Payphone requiere valores enteros)
    const amountInCents = Math.round(amount * 100);

    // Genera un ID único para esta transacción (máximo 15 caracteres)
    // Usamos los últimos 11 dígitos del timestamp para tener un ID único y corto
    const timestamp = Date.now().toString();
    const clientTransactionId = 'F' + timestamp.slice(-11); // F + 11 dígitos = 12 caracteres

    // Payphone requiere AmountWithoutTax o dejar Amount = AmountWithoutTax (sin impuestos)
    // Lo más simple es enviar el monto sin desglosar impuestos
    const payload = {
      amount: amountInCents,           // Total
      amountWithoutTax: amountInCents, // Mismo valor que amount (sin desglose de impuestos)
      currency: 'USD',
      reference: clientTransactionId,
      description: description,
      clientTransactionId: clientTransactionId,
      store: this.STORE_ID,
      email: userEmail,
      expiration: 600, // 10 minutos de validez
      responseUrl: window.location.origin + '/payment-response',
      cancellationUrl: window.location.origin + '/cart'
    };

    // Log para debug
    console.log('Payphone payload:', {
      amount: payload.amount,
      amountWithoutTax: payload.amountWithoutTax,
      currency: payload.currency,
      store: payload.store,
      valida: payload.amount === payload.amountWithoutTax
    });

    try {
      const response = await fetch(`${this.PAYPHONE_DEV_URL}/api/Links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.PAYPHONE_TOKEN}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error de Payphone:', errorData);
        throw new Error(errorData.message || 'Error al crear el link de pago');
      }

      const data = await response.json();

      console.log('Respuesta de Payphone:', data);

      // Payphone puede devolver un string directo (la URL) o un objeto
      let paymentUrl: string;

      if (typeof data === 'string') {
        // Payphone devolvió la URL directamente como string
        paymentUrl = data;
      } else if (data.payWithCard) {
        // Payphone devolvió un objeto con la propiedad payWithCard
        paymentUrl = data.payWithCard;
      } else {
        // No se recibió URL de pago
        return {
          transactionId: data.transactionId || 'UNKNOWN',
          status: 'Declined',
          amount: amount,
          message: data.message || 'Error al generar el link de pago'
        };
      }

      // Guardar el transactionId en sessionStorage para recuperarlo después
      sessionStorage.setItem('pendingTransactionId', data.transactionId || clientTransactionId);

      console.log('Redirigiendo a:', paymentUrl);

      // Cerrar cualquier modal de SweetAlert antes de redirigir
      Swal.close();

      // Pequeño delay para asegurar que SweetAlert se cierra antes de redirigir
      setTimeout(() => {
        window.location.href = paymentUrl;
      }, 100);

      return {
        transactionId: data.transactionId || clientTransactionId,
        status: 'Pending',
        amount: amount,
        message: 'Redirigiendo a Payphone...'
      };
    } catch (error) {
      console.error('Error procesando pago con Payphone:', error);
      throw error;
    }
  }

  // Método para verificar el estado de una transacción
  async verifyTransaction(transactionId: string): Promise<PayphoneResponse> {
    try {
      const response = await fetch(`${this.PAYPHONE_DEV_URL}/api/Sale/Confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.PAYPHONE_TOKEN}`
        },
        body: JSON.stringify({
          id: transactionId,
          clientTxId: transactionId
        })
      });

      const data = await response.json();

      return {
        transactionId: transactionId,
        status: this.mapPayphoneStatus(data.statusCode),
        amount: data.amount || 0,
        message: data.message || 'Transacción verificada'
      };
    } catch (error) {
      console.error('Error verificando transacción:', error);
      throw error;
    }
  }

  // Mapea los códigos de estado de Payphone a nuestros estados
  private mapPayphoneStatus(statusCode: number): 'Approved' | 'Declined' | 'Pending' {
    switch (statusCode) {
      case 3: // Aprobado
        return 'Approved';
      case 5: // Cancelado
      case 6: // Reversado
      case 7: // Rechazado
        return 'Declined';
      default: // Otros estados se consideran pendientes
        return 'Pending';
    }
  }
}
