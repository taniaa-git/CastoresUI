import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(data: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/api/auth/login`, data, { responseType: 'json' })
      .pipe(map((res: any) => {
        const token = res?.data?.token;
        if (token) {
          localStorage.setItem('currentUser', token );
        }
        return res;
      }));
  }
}