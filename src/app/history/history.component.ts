import { Component } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { NgFor } from '@angular/common'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { FilterByActionPipe } from './filter-by-action.pipe';


@Component({
  selector: 'app-history',
  imports:  [NgFor, ReactiveFormsModule,FormsModule, CommonModule, FilterByActionPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  warehouseLogs: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  selectedAction: string = '';

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit(): void {
    this.loadWarehouseLogs();
  }

  loadWarehouseLogs(): void {
    this.loading = true;
    this.error = null;

    this.warehouseService.getWarehouseLogs().subscribe({
      next: (response) => {
        console.log('Historial de almacén:', response);
        this.warehouseLogs = response.data.warehouseLogs;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar historial:', err);
        this.error = 'Hubo un error al cargar el historial.';
        this.loading = false;
      }
    });
  }

}
