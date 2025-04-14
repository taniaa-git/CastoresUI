import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  menuOpen = false;
  appTitle = 'Castores App';
  showTopBar = true;
  username: string | null = null;
  role: string | null = null;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    const userData = this.decodeToken();
    if (userData) {
      this.username = userData.username;
      this.role = userData.role;
      localStorage.setItem('userRole', userData.role);
    }
  }

  decodeToken(): { username: string, role: string } | null {
    const token = localStorage.getItem('currentUser');
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        username: payload.sub,
        role: payload.authorities?.[0] || 'Sin rol'
      };
    } catch (e) {
      console.error('Error al decodificar el token', e);
      return null;
    }
  }
  

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.menuOpen = false;
  }

  // Método para resaltar la ruta activa
  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
  }
}