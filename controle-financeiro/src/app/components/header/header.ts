import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="page-header">
      <h1 class="titulo">Controle Financeiro</h1>
    <div style="width:100%"><span class="subtitulo-mobile">50% - 30% - 20%</span></div>
      <div class="filtro-container">
        <select [value]="mesSelecionado" (change)="onMesChange($event)" class="select-mes">
          <option *ngFor="let mes of meses" [value]="mes.valor">{{ mes.nome }}</option>
        </select>
      </div>
      <div *ngIf="mostrarSaldo" class="saldo-container" [class.negativo]="saldo < 0">
        <h2>💰 Saldo Total: {{ currencyFormatter.format(saldo) }}</h2>
      </div>
    </header>
  `,
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  @Input() saldo: number = 0;
  @Input() meses: { valor: string; nome: string }[] = [];
  @Input() mesSelecionado: string = '';
  @Input() mostrarSaldo: boolean = false;
  @Output() mesChange = new EventEmitter<string>();

  protected readonly currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  onMesChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.mesChange.emit(select.value);
  }
}
