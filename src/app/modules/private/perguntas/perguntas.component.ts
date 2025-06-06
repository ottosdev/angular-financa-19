import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';


@Component({
  selector: 'app-perguntas',
  imports: [CardModule, CommonModule, SplitButtonModule, MenuModule, ButtonModule],
  templateUrl: './perguntas.component.html',
  styleUrl: './perguntas.component.css'
})
export class PerguntasComponent {
  menuAtivo: any;
  itens = [
    {
      id: 1,
      titulo: 'Tutorial',
      descricao: 'Instruções iniciais',
      rota: '/formulario/tutorial',
      preenchido: false
    },
    {
      id: 2,
      titulo: 'Dados Pessoais',
      descricao: 'Preencha suas informações',
      rota: '/formulario/dados-pessoais',
      preenchido: true
    },
    {
      id: 3,
      titulo: 'Experiência',
      descricao: 'Formulário de experiência profissional',
      rota: '/formulario/experiencia',
      preenchido: false
    }
  ];
  
  

  constructor(private router: Router) {}

  editar(id: number) {
    this.router.navigate(['/editar', id]);
  }

  visualizar(id: number) {
    this.router.navigate(['/visualizar', id]);
  }

  getMenu(itemId: number) {
    return [
      { label: 'Editar', icon: 'pi pi-pencil', command: () => this.editar(itemId) },
      { label: 'Visualizar', icon: 'pi pi-eye', command: () => this.visualizar(itemId) }
    ];
  }
  

  abrirFormulario(rota: string) {
    alert('abrindo o formulário na rota + ' + rota);
    this.itens = this.itens.map(item => {
      if(item.rota === rota) {
        item.preenchido = true;
      }
      return item;
    })
    this.router.navigate([rota]);
  }
  
}
