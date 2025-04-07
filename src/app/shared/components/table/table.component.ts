import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';

export interface IColumn {
  field: string;
  header: string;
  sortable?: boolean;
  type?: string;
}

@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    ToolbarModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    MenuModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() titulo: string = '';
  @Input() data: any[] = [];
  @Input() columns: IColumn[] = [];
  @Input() getActions!: (row: any) => MenuItem[];
  @ContentChild('acoesTemplate') acoesTemplate!: TemplateRef<any>;
  searchValue: string | undefined;
  abrirMenu(event: MouseEvent, menu: any) {
    event.preventDefault();
    event.stopPropagation();
    menu.toggle(event);
  }

 
}

/**
 * Exemplo de uso
 * 
 * data = [
  {
    code: 'P001',
    name: 'Teclado',
    price: 199.9,
    category: 'Eletrônicos',
  },
];

columns = [
  { field: 'code', header: 'Código' },
  { field: 'name', header: 'Nome', sortable: true },
  { field: 'price', header: 'Preço', sortable: true },
  { field: 'category', header: 'Categoria' },
];
 * 
 */
