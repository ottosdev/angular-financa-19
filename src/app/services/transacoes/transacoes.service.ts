import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment.dev';
import { ITransacaoDTO, ITransacaoRequest } from '../../interface/transacoes.dto';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ITotais {
  receitas: number;
  despesas: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {

  private http = inject(HttpClient);

  private url = `${environment.apiUrl}/transacao`;

  private totaisSubject = new BehaviorSubject<ITotais>({
    receitas: 0,
    despesas: 0,
    total: 0
  });
  
  totais$ = this.totaisSubject.asObservable();

  listarTodas(id: string): Observable<ITransacaoDTO> {
    return this.http.get<ITransacaoDTO>(`${this.url}/${id}`);
  }

  salvar(transacao: ITransacaoRequest): Observable<void> {
    return this.http.post<void>(this.url, transacao);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  atualizarTotais(receitas: number, despesas: number, total: number): void {
    this.totaisSubject.next({ receitas, despesas, total });
  }

}
