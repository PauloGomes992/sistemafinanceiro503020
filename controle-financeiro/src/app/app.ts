import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransacoesComponent } from './components/transacoes/transacoes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TransacoesComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}


