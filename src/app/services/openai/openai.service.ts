import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  private http = inject(HttpClient);

  private url = `${environment.apiUrl}/chat`;

  gerarMensagem(mensagem: string): Observable<String> {
    const param = new HttpParams().set('mensagem', mensagem);
    return this.http.get<String>(`${this.url}`, { params: param });
  }
}
