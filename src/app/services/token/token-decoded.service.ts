import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface TokenPayload {
  sub: string;
  email: string;
  cpf: string;
  nome: string;
  id: string;
  exp: number;
  iat: number;
  dataExpiracao: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class TokenDecodedService {
  private tokenKey = 'token';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  decodeToken(): TokenPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<TokenPayload>(token);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  getPayload(): TokenPayload | null {
    const payload = this.decodeToken();
    if (!payload) return null;
  
    let dataFormatada: string | undefined = undefined;
  
    if (payload.dataExpiracao) {
      try {
        const dateParsed = parseISO(payload.dataExpiracao);
        dataFormatada = format(dateParsed, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
        
      } catch (err) {
        console.warn('Erro ao formatar dataExpiradacao:', err);
      }
    }
  
    return {
      ...payload,
      dataExpiracao: dataFormatada ?? payload.dataExpiracao,
    };
  }

  getId(): string | null {
    return this.decodeToken()?.id || null;
  }

  getEmail(): string | null {
    return this.decodeToken()?.email || null;
  }

  getCpf(): string | null {
    return this.decodeToken()?.cpf || null;
  }

  isTokenExpired(): boolean {
    const exp = this.decodeToken()?.exp;
    if (!exp) return true;

    return Date.now() >= exp * 1000;
  }
}
