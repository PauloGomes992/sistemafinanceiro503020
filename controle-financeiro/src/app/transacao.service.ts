import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private apiUrl = 'http://localhost:8080/api/transacoes';

  constructor(private http: HttpClient) {}

  getTransacoes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  salvarTransacao(transacao: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, transacao);
  }

  atualizarTransacao(id: number, transacao: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, transacao);
  }

  excluirTransacao(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getSaldo(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/transacoes/saldo');
  }

  getCategorias(): Observable<{valor: string, descricao: string}[]> {
    return this.http.get<{valor: string, descricao: string}[]>('http://localhost:8080/api/transacoes/categorias');
  }
}
