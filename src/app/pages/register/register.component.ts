import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';
import { register } from '../../store/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../store/auth/auth.selectors';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  loading$;
  error$;
  private errorSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      direccion: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
    // Suscribirse a errores para mostrar alertas
    this.errorSubscription = this.error$.subscribe(error => {
      if (error) {
        Swal.fire({
          title: 'Error de registro',
          text: error,
          icon: 'error',
          confirmButtonColor: '#667eea'
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription?.unsubscribe();
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { confirmPassword, ...userData } = this.registerForm.value;
      this.store.dispatch(register({ userData }));
    } else {
      // Determinar mensaje de error específico
      let errorMessage = 'Por favor completa todos los campos correctamente';

      if (this.registerForm.hasError('passwordMismatch')) {
        errorMessage = 'Las contraseñas no coinciden';
      } else if (this.telefono?.hasError('pattern')) {
        errorMessage = 'El teléfono debe tener 10 dígitos';
      } else if (this.password?.hasError('minlength')) {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      } else if (this.email?.hasError('email')) {
        errorMessage = 'El correo electrónico no es válido';
      }

      Swal.fire({
        title: 'Formulario incompleto',
        text: errorMessage,
        icon: 'warning',
        confirmButtonColor: '#667eea'
      });
    }
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get nombre() {
    return this.registerForm.get('nombre');
  }

  get apellido() {
    return this.registerForm.get('apellido');
  }

  get telefono() {
    return this.registerForm.get('telefono');
  }

  get direccion() {
    return this.registerForm.get('direccion');
  }
}
