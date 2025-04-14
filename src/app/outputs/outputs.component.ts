import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-outputs',
  imports: [NgFor, ReactiveFormsModule, NgIf],
  templateUrl: './outputs.component.html',
  styleUrl: './outputs.component.css'
})
export class OutputsComponent {
  activeProducts: any[] = [];
  editForm: any;
  selectedProductId: any;
  availableQuantity: number = 0;
  modalInstance: any;



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
    this.availableQuantity = product.quantity;

    this.editForm.reset();

    this.editForm.get('quantity')?.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(this.availableQuantity)
    ]);
    this.editForm.get('quantity')?.updateValueAndValidity();
  }



  updateQuantity(): void {
    if (this.editForm.invalid || this.selectedProductId === null) return;
  
    const data = {
      id: this.selectedProductId,
      quantity: this.editForm.value.quantity,
    };
  
    this.productService.outputProduct(data).subscribe({
      next: () => {
        this.loadActiveProducts();
        // Cerrar modal
        const modal = document.getElementById('substractQuantityModal');
        const backdrop = document.querySelector('.modal-backdrop');
        if (modal && backdrop) {
          modal.classList.remove('show');
          modal.setAttribute('aria-hidden', 'true');
          modal.removeAttribute('style');
          backdrop.remove();
          document.body.classList.remove('modal-open');
        }
        this.selectedProductId = null;
        this.editForm.reset(); // opcional
      },
      error: (err) => {
        console.error('Error al actualizar cantidad:', err);
      },
    });
  }
  
}