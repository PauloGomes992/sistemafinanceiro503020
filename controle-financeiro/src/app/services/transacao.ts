import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface Transacao {
tipo: any;
  id?: number;
  descricao: string;
  valor: number;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private apiUrl = 'http://localhost:8080/api/transacoes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(this.apiUrl);
  }

  getTransacoes(): Observable<Transacao[]> {


  return this.http.get<Transacao[]>(this.apiUrl).pipe(
    tap(data => {}),
    catchError(error => {
      return throwError(() => error);
    })
  );
}

}

