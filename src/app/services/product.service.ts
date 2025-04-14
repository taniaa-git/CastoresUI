import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getAllProducts() {
    return this.http.get(`${this.apiUrl}/api/products`);
  }

  // Crear un nuevo producto
  createProduct(data: any) {
    return this.http.post(`${this.apiUrl}/api/products`, data, { responseType: 'json' }).pipe(
      map((res: any) => res?.data)
    );
  }

  updateProductQuantity(data: any) {
    return this.http.put(`${this.apiUrl}/api/warehouse/addQuantity`, data , { responseType: 'json' }).pipe(
      map((res: any) => res?.data)
    );
  }

  toggleProductStatus(id: number) {
    return this.http.delete(`${this.apiUrl}/api/products/${id}`);
  }
  
  updateProductStatus(data: any) {
    return this.http.put(`${this.apiUrl}/api/products/${data.id}`, data);
  }
  
  outputProduct(data: any) {
    return this.http.put(`${this.apiUrl}/api/warehouse/subtractQuantity`, data , { responseType: 'json' }).pipe(
      map((res: any) => res?.data)
    );
  }

}
