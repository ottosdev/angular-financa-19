import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ITransacaoDTO } from '../../../../../interface/transacoes.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-totalizadores',
  imports: [CardModule, CommonModule],
  templateUrl: './totalizadores.component.html',
  styleUrl: './totalizadores.component.css',
})
export class TotalizadoresComponent {
  @Input() transacoes!: ITransacaoDTO;
}
