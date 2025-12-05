import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TransacaoService } from '../../transacao.service';
import { HeaderComponent } from '../header/header';
import { TransacaoFormComponent } from '../transacao-form/transacao-form';
import { TransacaoListComponent } from '../transacao-list/transacao-list';
import { GraficoComponent } from '../grafico/grafico';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-transacoes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    TransacaoFormComponent,
    TransacaoListComponent,
    GraficoComponent,
  ],
  template: `
    <div class="transacoes-page">
      <app-header
        [meses]="meses"
        [mesSelecionado]="mesSelecionado"
        (mesChange)="onMesChange($event)"
      >
      </app-header>

      <app-transacao-form #transacaoForm [disabled]="!isMesCorrente()" (save)="salvar($event)">
      </app-transacao-form>

      <hr />

      <div class="content-grid">
        <app-transacao-list
          [transacoes]="transacoesFiltradas"
          (edit)="editar($event)"
          (delete)="excluir($event)"
        >
        </app-transacao-list>

        <div class="list-chart-separator"></div>

        <div class="charts-wrapper">
          <app-grafico *ngIf="isBrowser" [dados]="chartDataSubcategoria"> </app-grafico>
          <app-grafico *ngIf="isBrowser" [dados]="chartDataCategoria"> </app-grafico>
        </div>

        <div class="list-chart-separator"></div>

        @if (isBrowser) {
        <div class="resumo-subcats">
          @for (r of resumoSubcategorias; track r.nome) {
          <div class="resumo-item" [class.alerta]="r.alerta">
            <span class="label">{{ r.nome }}</span>
            <span class="valor">{{ currencyFormatter.format(r.valor) }}</span>
            <span class="percent">({{ r.percent | number : '1.0-1' }}%)</span>
          </div>
          }
        </div>
        }
        <div class="list-chart-separator"></div>
        <div class="meta-text-card">
          <p>
            O objetivo é dividir a sua renda em:
            <br />
            <strong>50% Essenciais</strong> - Moradia, Saúde, Contas e Mercado.
            <br />
            <strong>30% Não-essenciais</strong> - Alimentação, Transporte, Lazer, Vestuário,
            Compras, Outros.
            <br />
            <strong>20% Enriquecer</strong> - Educação, Reserva, Investimentos.
          </p>
        </div>

        <div class="list-chart-separator"></div>
      </div>
    </div>
  `,
  styleUrls: ['./transacoes.css'],
})
export class TransacoesComponent implements OnInit {
  isMesCorrente(): boolean {
    const hoje = new Date();
    const mesAtual = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;
    return this.mesSelecionado === mesAtual;
  }
  isBrowser: boolean;
  transacoes: any[] = [];
  transacoesFiltradas: any[] = [];
  saldo: number = 0;
  chartDataCategoria: { categoria: string; valor: number }[] = [];
  chartDataSubcategoria: { subcategoria: string; valor: number }[] = [];
  mesSelecionado: string;
  meses: { valor: string; nome: string }[] = [];
  @ViewChild('transacaoForm') transacaoForm!: TransacaoFormComponent;
  resumoSubcategorias: { nome: string; valor: number; percent: number; alerta?: boolean }[] = [];
  protected readonly currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  constructor(
    private service: TransacaoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialogService: DialogService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    const hoje = new Date();
    this.mesSelecionado = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;
    this.preencherMeses();
  }

  private preencherMeses(): void {
    const hoje = new Date();
    const meses = [];
    for (let i = 0; i < 12; i++) {
      const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
      const valor = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
      const nome = data.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
      meses.push({ valor, nome });
    }
    this.meses = meses;
  }

  filtrarTransacoesPorMes(): void {
    if (!this.mesSelecionado) {
      this.transacoesFiltradas = [...this.transacoes];
      return;
    }

    const [ano, mes] = this.mesSelecionado.split('-').map(Number);
    this.transacoesFiltradas = this.transacoes.filter((t) => {
      const data = new Date(t.data);
      return data.getFullYear() === ano && data.getMonth() === mes - 1;
    });

    this.atualizarSaldo();
    this.atualizarGrafico();
  }

  onMesChange(novoMes: string): void {
    this.mesSelecionado = novoMes;
    this.filtrarTransacoesPorMes();
  }

  ngOnInit(): void {
    this.carregarTransacoes();
  }

  carregarTransacoes(): void {
    this.service.getTransacoes().subscribe({
      next: (data) => {
        this.transacoes = [...data];
        this.filtrarTransacoesPorMes();
      },
      error: (err) => {
        this.dialogService.quickError(
          'Erro ao Carregar',
          'Não foi possível carregar as transações.',
          err.message || 'Erro de conexão'
        ).subscribe();
      },
    });
  }

  totalReceitas: number = 0;
  totalDespesas: number = 0;

  atualizarSaldo(): void {
    this.totalReceitas = this.transacoesFiltradas
      .filter((t) => t.tipo === 'RECEITA')
      .reduce((acc, t) => acc + Number(t.valor), 0);

    this.totalDespesas = this.transacoesFiltradas
      .filter((t) => t.tipo === 'DESPESA')
      .reduce((acc, t) => acc + Number(t.valor), 0);

    this.saldo = this.totalReceitas - this.totalDespesas;
  }

  salvar(transacao: any): void {
    if (transacao.id) {
      this.service.atualizarTransacao(transacao.id, transacao).subscribe({
        next: (updated) => {
          if (updated) {
            this.transacoes = this.transacoes.map((t) => (t.id === updated.id ? updated : t));
            this.filtrarTransacoesPorMes();
            this.transacaoForm?.resetForm();
            this.dialogService.quickSuccess(
              'Sucesso!',
              'Transação atualizada com sucesso!'
            ).subscribe();
          }
        },
        error: (err) => {
          this.dialogService.quickError(
            'Erro ao Atualizar',
            'Não foi possível atualizar a transação.',
            err.message || 'Erro desconhecido'
          ).subscribe();
        },
      });
    } else {
      this.service.salvarTransacao(transacao).subscribe({
        next: (saved) => {
          if (saved) {
            this.transacoes = [saved, ...this.transacoes];
            this.filtrarTransacoesPorMes();
            this.dialogService.quickSuccess(
              'Sucesso!',
              'Transação salva com sucesso!'
            ).subscribe();
          }
        },
        error: (err) => {
          this.dialogService.quickError(
            'Erro ao Salvar',
            'Não foi possível salvar a transação.',
            err.message || 'Erro desconhecido'
          ).subscribe();
        },
      });
    }
  }

  editar(transacao: any): void {
    if (this.transacaoForm) {
      this.transacaoForm.patchValue({
        descricao: transacao.descricao,
        valor: transacao.valor,
        tipo: transacao.tipo,
        categoria: transacao.categoria,
        id: transacao.id,
      });
    }
  }

  excluir(id: number): void {
    this.dialogService.quickConfirm(
      'Confirmar Exclusão',
      'Deseja realmente excluir esta transação?'
    ).subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.excluirTransacao(id).subscribe({
          next: () => {
            this.transacoes = this.transacoes.filter((t) => t.id !== id);
            this.filtrarTransacoesPorMes();
            this.dialogService.quickSuccess(
              'Sucesso!',
              'Transação excluída com sucesso!'
            ).subscribe();
          },
          error: (err) => {
            this.dialogService.quickError(
              'Erro ao Excluir',
              'Não foi possível excluir a transação.',
              err.message || 'Erro desconhecido'
            ).subscribe();
          },
        });
      }
    });
  }

  atualizarGrafico(): void {
    const despesas = this.transacoesFiltradas.filter((t) => t.tipo === 'DESPESA');

    if (!despesas.length) {
      this.chartDataCategoria = [];
      this.chartDataSubcategoria = [];
      this.resumoSubcategorias = [
        { nome: 'Essenciais', valor: 0, percent: 0, alerta: false },
        { nome: 'Não essenciais', valor: 0, percent: 0, alerta: false },
        { nome: 'Enriquecer', valor: 0, percent: 0, alerta: false },
      ];
      return;
    }

    const despesasPorCategoria = despesas.reduce((acc, t) => {
      const categoria = t.categoria || 'Outros';
      if (!acc[categoria]) {
        acc[categoria] = 0;
      }
      acc[categoria] += Number(t.valor);
      return acc;
    }, {} as { [key: string]: number });

    this.chartDataCategoria = Object.entries(despesasPorCategoria)
      .map(([categoria, valor]) => ({ categoria, valor: valor as number }))
      .sort((a, b) => b.valor - a.valor);

    const despesasPorSubcategoria = despesas.reduce((acc, t) => {
      let subcategoria = t.subcategoria;
      if (!subcategoria && t.categoria) {
        switch (t.categoria) {
          case 'MORADIA':
          case 'SAUDE':
          case 'CONTAS':
          case 'MERCADO':
            subcategoria = 'Essenciais';
            break;
          case 'ALIMENTACAO':
          case 'TRANSPORTE':
            subcategoria = 'Não essenciais';
            break;
          case 'EDUCACAO':
          case 'RESERVA':
          case 'INVESTIMENTOS':
            subcategoria = 'Enriquecer';
            break;
          default:
            subcategoria = 'Não essenciais';
        }
      }
      if (!acc[subcategoria]) {
        acc[subcategoria] = 0;
      }
      acc[subcategoria] += Number(t.valor);
      return acc;
    }, {} as { [key: string]: number });

    this.chartDataSubcategoria = Object.entries(despesasPorSubcategoria)
      .map(([subcategoria, valor]) => ({ subcategoria, valor: valor as number }))
      .sort((a, b) => b.valor - a.valor);

    const total = Object.values(despesasPorSubcategoria as { [key: string]: number }).reduce(
      (acc: number, v: number) => acc + v,
      0
    );
    const ess = despesasPorSubcategoria['Essenciais'] || 0;
    const nao = despesasPorSubcategoria['Não essenciais'] || 0;
    const enr = despesasPorSubcategoria['Enriquecer'] || 0;
    const essPercent = total > 0 ? (ess / total) * 100 : 0;
    const naoPercent = total > 0 ? (nao / total) * 100 : 0;
    const enrPercent = total > 0 ? (enr / total) * 100 : 0;
    this.resumoSubcategorias = [
      { nome: 'Essenciais', valor: ess, percent: essPercent, alerta: essPercent > 50 },
      { nome: 'Não essenciais', valor: nao, percent: naoPercent, alerta: naoPercent > 30 },
      { nome: 'Enriquecer', valor: enr, percent: enrPercent, alerta: enrPercent < 20 },
    ];
  }
}
