import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ITotais, TransacoesService } from '../../../services/transacoes/transacoes.service';


@Component({
  selector: 'app-totalizadores',
  imports: [CardModule, CommonModule],
  templateUrl: './totalizadores.component.html',
  styleUrl: './totalizadores.component.css',
})
export class TotalizadoresComponent {
  totais!: ITotais;

  constructor(private transacoesService: TransacoesService) {}

  ngOnInit(): void {
    this.transacoesService.totais$.subscribe((dados) => {
      this.totais = dados;
    });
  }
}
