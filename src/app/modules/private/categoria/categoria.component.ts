import { Component, inject } from '@angular/core';
import {
  IColumn,
  TableComponent,
} from '../../../shared/components/table/table.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Dialog } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import {
  CategoriaService,
  ICategoriaResponse,
} from '../../../services/categoria/categoria.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { ToastService } from '../../../services/toast/toast.service';
import { DialogService } from '../../../services/dialog/dialog.service';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-categoria',
  imports: [
    TableComponent,
    ToolbarModule,
    ButtonComponent,
    MenuModule,
    Dialog,
    InputComponent,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    SelectComponent,
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
})
export class CategoriaComponent {
  categoriaService = inject(CategoriaService);
  dialogService = inject(DialogService);
  formGroup!: FormGroup;
  fb = inject(FormBuilder);
  toastService = inject(ToastService);
  categorias: any[] = [];
  categoriaDialog: boolean = false;
  categoriaSelecionada: ICategoriaResponse | null = null;
  loading: boolean = false;

  colunasTable: IColumn[] = [
    { field: 'nome', header: 'Nome', sortable: true },
    { field: 'tipo', header: 'Tipo Categoria', sortable: true },
  ];

  ngOnInit() {
    this.formGroup = this.criarFormularioCategoria();
    this.buscarCategorias();
  }

  criarFormularioCategoria() {
    return this.fb.group({
      nome: [null, Validators.required],
      tipo: [null, Validators.required],
    });
  }

  getAcoesPorLinha = (row: any): MenuItem[] => [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => this.editarCategoria(row),
    },
    {
      label: 'Excluir',
      icon: 'pi pi-trash',
      command: () => this.deletarCategoria(row.id),
    },
  ];

  openNew() {
    this.categoriaSelecionada = null;
    this.formGroup.reset();
    this.categoriaDialog = true;
  }

  hideDialog() {
    this.categoriaDialog = false;
  }

  handleSalvarCategoria() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.loading = true;

    const categoriaParaSalvar = {
      ...this.formGroup.value,
      id: this.categoriaSelecionada?.id || null,
    };

    if (this.categoriaSelecionada) {
      this.categoriaService.atualizarCategoria(categoriaParaSalvar).subscribe({
        next: () => {
          this.categoriaDialog = false;
          this.loading = false;
          this.formGroup.reset();
          this.categoriaSelecionada = null;
          this.buscarCategorias();
          this.toastService.success(
            'Categoria',
            'Categoria atualizada com sucesso!'
          );
        },
      });
      return;
    }

    this.categoriaService.salvarCategoria(categoriaParaSalvar).subscribe({
      next: () => {
        this.categoriaDialog = false;
        this.loading = false;
        this.formGroup.reset();
        this.categoriaSelecionada = null;
        this.buscarCategorias();
        this.toastService.success('Categoria', 'Categoria salva com sucesso!');
      },
    });
  }

  editarCategoria(categoria: any) {
    this.categoriaSelecionada = categoria;
    this.formGroup.patchValue({
      nome: categoria.nome,
      tipo: categoria.tipo,
    });
    this.categoriaDialog = true;
  }

  buscarCategorias() {
    this.categoriaService.buscarCategorias().subscribe({
      next: (res) => {
        this.categorias = res;
      },
    });
  }

  deletarCategoria(id: string) {
    this.dialogService.openDialog({
      accept: () => this.confirmarDelete(id),
      message: 'Você tem certeza que deseja deletar essa categoria?',
      header: 'Deletar Categoria',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
    });
  }

  confirmarDelete(id: string) {
    this.categoriaService.deletarCategoria(id).subscribe({
      next: () => {
        this.toastService.success(
          'Categoria',
          'Categoria deletada com sucesso!'
        );
        this.buscarCategorias();
      },
    });
  }

  categoriasOpcoes = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];
}
