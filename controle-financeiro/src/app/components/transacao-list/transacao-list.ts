import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transacao-list',
  standalone: true,
  template: `
    <section class="list-section">
      <ul class="transacoes-list">
        @for (t of transacoesVisiveis; track t.id) {
          <li class="transacao-item">
            <div class="transacao-info">
              <div class="descricao">{{ t.descricao }}</div>
              <div class="valor">{{ currencyFormatter.format(t.valor) }}</div>
              <div class="tipo">{{ t.tipo }}</div>
              @if (t.tipo === 'DESPESA') {
                <div class="categoria">{{ t.categoria }}</div>
              }
              <div class="data">{{ formatarData(t.data) }}</div>
            </div>
            <div class="transacao-actions">
              <button class="btn edit" (click)="onEdit(t)">Editar</button>
              <button class="btn delete" (click)="onDelete(t.id)">Excluir</button>
            </div>
          </li>


        } @empty {
          <li class="sem-transacoes">Nenhuma transação encontrada</li>
        }
      </ul>
      @if (!mostrarTodas && transacoes.length > 5) {
        <div class="mostrar-mais-container">
          <button class="btn secondary" (click)="mostrarTodas = true">Mostrar mais</button>
        </div>
      }
    </section>
  `,
  styleUrls: ['./transacao-list.css']
})
export class TransacaoListComponent {
  @Input() transacoes: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();
  mostrarTodas = false;
  get transacoesVisiveis() {
    return this.mostrarTodas ? this.transacoes : this.transacoes.slice(0, 5);
  }

  protected readonly currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  onEdit(transacao: any): void {
    this.edit.emit(transacao);
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  formatarData(data: string): string {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
