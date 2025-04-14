import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BootstrapService {
  private notificationElement: HTMLElement | null = null;

  constructor() {
    this.initializeNotificationContainer();
  }

  private initializeNotificationContainer(): void {
    this.notificationElement = document.createElement('div');
    this.notificationElement.className = 'position-fixed top-0 end-0 p-3';
    this.notificationElement.style.zIndex = '1100';
    document.body.appendChild(this.notificationElement);
  }

  showSuccess(message: string): void {
    this.showNotification(message, 'success');
  }

  showError(message: string): void {
    this.showNotification(message, 'danger');
  }

  private showNotification(message: string, type: 'success' | 'danger'): void {
    if (!this.notificationElement) return;

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    this.notificationElement.appendChild(alertDiv);

    // Auto-remover después de 5 segundos
    setTimeout(() => {
      alertDiv.classList.remove('show');
      setTimeout(() => {
        alertDiv.remove();
      }, 150);
    }, 5000);
  }
}