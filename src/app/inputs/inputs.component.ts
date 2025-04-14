import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  imports: [NgFor, ReactiveFormsModule, NgIf],
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements OnInit {
  activeProducts: any[] = [];
  editForm: any;
  selectedProductId: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.editForm = this.fb.group({
      quantity: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadActiveProducts();
  }

  loadActiveProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        const allProducts = res.data.productsList;
        this.activeProducts = allProducts.filter((product: any) => product.deletedAt === null);
      },
      error: (err) => {
        console.error('Error al cargar productos activos:', err);
      }
    });
  }

  openModal(product: any): void {
    this.selectedProductId = product.id;
    this.editForm.reset();
  }

  updateQuantity(): void {
    if (this.editForm.invalid || this.selectedProductId === null) return;

    const data = {
      id: this.selectedProductId,
      quantity: this.editForm.value.quantity,
    };

    this.productService.updateProductQuantity(data).subscribe({
      next: () => {
        this.loadActiveProducts();

        // Cerrar modal
        const modal = document.getElementById('addQuantityModal');
        const backdrop = document.querySelector('.modal-backdrop');
        if (modal && backdrop) {
          modal.classList.remove('show');
          modal.setAttribute('aria-hidden', 'true');
          modal.removeAttribute('style');
          backdrop.remove();
          document.body.classList.remove('modal-open');
        }

        this.selectedProductId = null;
      },
      error: (err) => {
        console.error('Error al actualizar cantidad:', err);
      },
    });
  }
}