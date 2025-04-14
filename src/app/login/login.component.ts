import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ReactiveFormsModule, 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BootstrapService } from './bootstrap.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  showPassword = false;
  errorMessage!: string;
  user: string = "";
  pass: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private bootstrapService: BootstrapService // Opcional para notificaciones
  ) {
    this.loginForm = this.fb.group({
      username: ['tania', Validators.required],
      password: ['1234', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    this.errorMessage = '';
    this.loginForm.markAllAsTouched();
  
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor complete todos los campos requeridos';
      return;
    }
  
    this.loading = true;
  
    const data = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
  
    this.authService.login(data).pipe(first()).subscribe(
      res => {
        const response: any = res;
        if (response && response.length !== 0) {
          this.router.navigate(['/inventory']);
        } else {
          this.errorMessage = 'Credenciales incorrectas';
          this.loading = false;
        }
      },
      error => {
        console.error(error);
        this.errorMessage = 'Ocurrió un error al iniciar sesión';
        this.loading = false;
      }
    );
  }
  
}