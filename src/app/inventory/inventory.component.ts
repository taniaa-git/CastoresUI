import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service'; // ajusta la ruta si es necesario
import { NgFor, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-inventory',
  imports: [NgFor, ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  allProducts: any[] = [];
  productForm!: FormGroup;
  loading = false;
  role: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]]
    });
    this.loadProducts();
    this.role = localStorage.getItem('userRole');
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.allProducts = res.data.productsList;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
      }
    });
  }

  createProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const data = {
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price
    };

    this.loading = true;
    this.productService.createProduct(data).subscribe({
      next: () => {
        this.loadProducts();
        this.productForm.reset();
        this.loading = false;
        this.hideModalProperly()
      },
      error: (err) => {
        this.hideModalProperly()
        this.loading = false;
      }
    });
  }

  toggleProductStatus(productId: number): void {
    this.productService.toggleProductStatus(productId).subscribe({
      next: () => {
        this.loadProducts(); // Recarga la lista de productos
      },
      error: (err) => {
        console.error('Error al cambiar estado del producto:', err);
      }
    });
  }

  hideModalProperly(): void {
    const backdrops = document.getElementsByClassName('modal-backdrop');
    while (backdrops.length > 0) { backdrops[0].remove(); }
    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '';
    const modal = document.getElementById('addProductModal');
    if (modal) { modal.style.display = 'none'; modal.classList.remove('show'); }
  }
}
