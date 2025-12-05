import { Component, Input, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico',
  standalone: true,
  template: `
    @if (dados.length > 0) {
      <div class="grafico-container">
        <canvas #chartCanvas></canvas>
      </div>
    } @else {
      <div class="sem-dados">
        <p>Não há despesas no período selecionado</p>
      </div>
    }
  `,
  styleUrls: ['./grafico.css']
})
export class GraficoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  @Input() set dados(value: { categoria?: string; subcategoria?: string; valor: number }[]) {
    this._dados = value;
    this.atualizarGrafico();
  }
  get dados(): { categoria?: string; subcategoria?: string; valor: number }[] {
    return this._dados;
  }
  private _dados: { categoria?: string; subcategoria?: string; valor: number }[] = [];

  private readonly chartType: ChartType = 'doughnut';

  ngOnInit(): void {
    this.atualizarGrafico();
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }

  private atualizarGrafico() {
    if (this.chart) {
      const labels = this.dados.map(d => d.subcategoria || d.categoria);
      const values = this.dados.map(d => d.valor);
      const cores = [
        '#FF6B6B',
        '#4ECDC4',
        '#45B7D1',
        '#96CEB4',
        '#FFEEAD',
        '#D4A5A5',
        '#9B5DE5',
        '#F15BB5',
        '#00BBF9',
        '#00F5D4'
      ];

      this.chart.data.labels = labels;
      this.chart.data.datasets = [
        {
          data: values,
          backgroundColor: cores.slice(0, labels.length)
        }
      ];
      this.chart.update();
    }
  }

  private createChart() {
    try {
      if (!this.chartCanvas || !this.chartCanvas.nativeElement) {
        setTimeout(() => this.createChart(), 50);
        return;
      }
      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      if (!ctx) return;

      const moneyFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      this.chart = new Chart(ctx, {
        type: this.chartType as any,
        data: {
          labels: this.dados.map(d => d.subcategoria || d.categoria),
          datasets: [{
            data: this.dados.map(d => d.valor),
            backgroundColor: [
              '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
              '#D4A5A5', '#9B5DE5', '#F15BB5', '#00BBF9', '#00F5D4'
            ]
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'right' as const,
              labels: {
                padding: 16,
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  const v = (context.parsed && typeof context.parsed === 'object')
                    ? (context.parsed.y ?? context.parsed)
                    : context.parsed ?? context.raw;
                  const total = context.dataset.data.reduce((acc: number, curr: number) => acc + curr, 0);
                  const percent = total > 0 ? ((Number(v) / total) * 100).toFixed(1) : '0';
                  return `${moneyFormatter.format(Number(v))} (${percent}%)`;
                }
              }
            }
          },
          scales: {
            y: {
              display: false
            }
          }
        },
      });
    } catch (e) {

    }
  }
}
