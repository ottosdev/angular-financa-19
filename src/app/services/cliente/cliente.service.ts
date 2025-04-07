import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClientDTO } from '../../interface/cliente.dto';
import { environment } from '../../../environments/enviroment.dev';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/clientes`;


  buscarClientePorId(id: string): Observable<IClientDTO> {
    return this.http.get<IClientDTO>(`${this.url}/${id}`);
  }
  
  atualizarCliente(dto: IClientDTO): Observable<IClientDTO> {
    return this.http.put<any>(this.url, dto);
  }
}
