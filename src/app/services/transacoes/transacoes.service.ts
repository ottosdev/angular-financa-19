import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment.dev';
import { ITransacaoDTO, ITransacaoRequest } from '../../interface/transacoes.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {

  private http = inject(HttpClient);

  private url = `${environment.apiUrl}/transacao`;
  

  listarTodas(id: string): Observable<ITransacaoDTO> {
    return this.http.get<ITransacaoDTO>(`${this.url}/${id}`);
  }

  salvar(transacao: ITransacaoRequest): Observable<void> {
    return this.http.post<void>(this.url, transacao);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
