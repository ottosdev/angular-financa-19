import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment.dev';
import { IAuthResponse, ILoginDTO, IRegisterDTO } from '../../interface/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private url = `${environment.apiUrl}/auth`;

  login(data: ILoginDTO): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.url}/login`, data);
  }

  registrar(data: IRegisterDTO): Observable<void> {
    return this.http.post<void>(`${this.url}/register`, data);
  }

  setLocalStorage(data: IAuthResponse) {
    localStorage.setItem('token', data.token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
