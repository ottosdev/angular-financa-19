import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment.dev';
export interface ICategoriaResponse {
  id?: string;
  nome: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private http = inject(HttpClient);

  private url = `${environment.apiUrl}/categorias`;

  salvarCategoria(dto: ICategoriaResponse): Observable<ICategoriaResponse> {
    return this.http.post<any>(this.url, dto);
  }

  atualizarCategoria(dto: ICategoriaResponse): Observable<ICategoriaResponse> {
    return this.http.put<any>(this.url, dto);
  }

  buscarCategorias(): Observable<ICategoriaResponse[]> {
    return this.http.get<ICategoriaResponse[]>(this.url);
  }

  deletarCategoria(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
