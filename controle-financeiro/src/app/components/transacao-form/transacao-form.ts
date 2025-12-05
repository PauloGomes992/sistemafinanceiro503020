import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransacaoService } from '../../transacao.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-transacao-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="form-section">
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-transacao" [class.disabled]="disabled">
        <div class="form-field">
          <select formControlName="tipo">
            <option value="">Selecione o tipo</option>
            <option value="RECEITA">Receita</option>
            <option value="DESPESA">Despesa</option>
          </select>
          @if (form.get('tipo')?.touched && form.get('tipo')?.errors?.['required']) {
            <div class="error-message">
              Tipo é obrigatório
            </div>
          }
        </div>

        @if (form.get('tipo')?.value === 'DESPESA') {
          <div class="form-field">
            <select formControlName="categoria" class="campo-categoria">
              <option value="">Selecione a categoria</option>
              @for (cat of categorias; track cat.valor) {
                <option [value]="cat.valor">{{ cat.descricao }}</option>
              }
            </select>
          </div>
        }

        <div class="form-field">
          <input formControlName="descricao" placeholder="Descrição" />
          @if (form.get('descricao')?.touched && form.get('descricao')?.errors?.['required']) {
            <div class="error-message">
              Descrição é obrigatória
            </div>
          }
        </div>

        <div class="form-field">
          <input
            formControlName="valor"
            type="text"
            placeholder="Valor (R$)"
            [value]="form.get('valor')?.value ? numberFormatter.format(form.get('valor')?.value) : ''"
            (input)="formatarValorInput($event)"
            inputmode="decimal"
          />
          @if (form.get('valor')?.touched && form.get('valor')?.errors?.['required']) {
            <div class="error-message">
              Valor é obrigatório
            </div>
          }
          @if (form.get('valor')?.touched && form.get('valor')?.errors?.['min']) {
            <div class="error-message">
              Valor deve ser maior que zero
            </div>
          }
        </div>

  <button type="submit" class="btn primary" [disabled]="disabled">{{ editando ? 'Atualizar' : 'Salvar' }}</button>
      </form>
    </section>
  `,
  styleUrls: ['./transacao-form.css']
})
export class TransacaoFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  @Output() save = new EventEmitter<any>();
  @Input() disabled: boolean = false;
  editando = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.form) {
      if (this.disabled) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }

  protected readonly numberFormatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  categorias: { valor: string; descricao: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private transacaoService: TransacaoService,
    private dialogService: DialogService
  ) {
    this.form = this.fb.group({
      id: [null],
      descricao: [{ value: '', disabled: this.disabled }, Validators.required],
      valor: [{ value: '', disabled: this.disabled }, [Validators.required, Validators.min(0)]],
      tipo: [{ value: '', disabled: this.disabled }, Validators.required],
      categoria: [{ value: '', disabled: this.disabled }],
    });
  }

  formatarValorInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');
    valor = (Number(valor) / 100).toString();
    this.form.get('valor')?.setValue(Number(valor));
    input.value = this.numberFormatter.format(Number(valor));
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;

      const valor = typeof formValue.valor === 'string' ?
        Number(formValue.valor.replace(/[^\d.,]/g, '').replace(',', '.')) :
        formValue.valor;

      const transacao = {
        ...formValue,
        valor: valor,
        tipo: formValue.tipo,
        categoria: formValue.tipo === 'DESPESA' ? formValue.categoria : null
      };

      this.save.emit(transacao);
      if (!this.editando) {
        this.form.reset();
      }
    } else {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
    }
  }

  patchValue(value: any): void {
    this.form.patchValue(value);
    this.editando = true;
  }

  resetForm(): void {
    this.form.reset();
    this.editando = false;
  }

  ngOnInit(): void {
    this.carregarCategorias();
  }

  private carregarCategorias(): void {
    this.transacaoService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (err) => {
        this.dialogService.quickError(
          'Erro ao Carregar Categorias',
          'Não foi possível carregar as categorias.',
          err.message || 'Erro de conexão'
        ).subscribe();
      }
    });
  }
}
