import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="resumo-container">
      <div class="resumo-item receitas">
        <h3>Total de Receitas</h3>
        <p>{{ currencyFormatter.format(totalReceitas) }}</p>
      </div>
      <div class="resumo-item despesas">
        <h3>Total de Despesas</h3>
        <p>{{ currencyFormatter.format(totalDespesas) }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./resumo.css']
})
export class ResumoComponent {
  @Input() totalReceitas: number = 0;
  @Input() totalDespesas: number = 0;

  protected readonly currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}
