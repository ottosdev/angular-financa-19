import { Component, Inject, inject } from '@angular/core';
import { TotalizadoresComponent } from './components/totalizadores/totalizadores.component';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import {
  IColumn,
  TableComponent,
} from '../../../shared/components/table/table.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog, DialogModule } from 'primeng/dialog';
import { InputComponent } from '../../../shared/components/input/input.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import {
  ITransacaoDTO,
  ITransacaoRequest,
  ITransacaoTable,
} from '../../../interface/transacoes.dto';
import { MenuItem } from 'primeng/api';
import { InputMoneyComponent } from '../../../shared/components/input-money/input-money.component';
import { TransacoesService } from '../../../services/transacoes/transacoes.service';
import { TokenDecodedService } from '../../../services/token/token-decoded.service';
import { format } from 'date-fns';
import { CategoriaService, ICategoriaResponse } from '../../../services/categoria/categoria.service';
import { ToastService } from '../../../services/toast/toast.service';
import { DialogService } from '../../../services/dialog/dialog.service';

@Component({
  selector: 'app-transacoes',
  imports: [
    ReactiveFormsModule,
    TotalizadoresComponent,
    ToolbarModule,
    ButtonComponent,
    CommonModule,
    TableComponent,
    Dialog,
    InputComponent,
    SelectComponent,
    InputMoneyComponent,
  ],
  templateUrl: './transacoes.component.html',
  styleUrl: './transacoes.component.css',
})
export class TransacoesComponent {
  formGroup!: FormGroup;
  transacaoDialog: boolean = false;
  transacoes!: ITransacaoDTO;
  transacaoSelecionada: ITransacaoTable | null = null;
  transacoesTable: ITransacaoTable[] = [];
  loading: boolean = false;
  categorias: ICategoriaResponse[] = [];
  categoriasOpcoes: any[] = [];
  
  colunasTable: IColumn[] = [
    { field: 'nome', header: 'Nome', sortable: true },
    { field: 'tipoCategoria', header: 'Tipo Categoria', sortable: true },
    { field: 'valor', header: 'Valor', sortable: true, type: 'currency' },
    { field: 'dataTransacao', header: 'Dt Criação', sortable: true },
  ];

  private fb = inject(FormBuilder);
  private transacaoService = inject(TransacoesService);
  private tokenDecodeService = inject(TokenDecodedService);
  private categoriaService = inject(CategoriaService);
  private toastService = inject(ToastService);
  private dialogService = inject(DialogService);

  ngOnInit() {
    this.criarFormulario();
    this.buscarTodasTransacoes();
    this.buscarCategorias();
  }

  criarFormulario() {
    this.formGroup = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      valor: ['', Validators.required],
      dataTransacao: [''],
    });
  }

  getAcoesPorLinha = (row: any): MenuItem[] => [
    {
      label: 'Detalhar',
      icon: 'pi pi-eye',
      command: () => this.handleDetalharTransacao(row),
    },
    {
      label: 'Excluir',
      icon: 'pi pi-trash',
      command: () => this.deletarTransacao(row.id),
    },
  ];

  criarNovaTransacao() {
    this.formGroup.reset();
    this.transacaoDialog = true;
  }

  hideDialog() {
    this.transacaoDialog = false;
    this.transacaoSelecionada = null;
    this.formGroup.enable();
    this.formGroup.reset();
  }

  handleSalvarTransacao() {
    const data: ITransacaoRequest = {
      nome: this.formGroup.get('nome')?.value,
      categoriaId: this.formGroup.get('tipo')?.value,
      clienteId: this.tokenDecodeService.getId()!,
      valor: this.formGroup.get('valor')?.value,
      dataTransacao: new Date().toISOString(),
    }

    this.loading = true;

    this.transacaoService.salvar(data).subscribe({
      next: () => {
        this.toastService.success('Sucesso', 'Transação criada com sucesso!');
        this.hideDialog();
        this.buscarTodasTransacoes();
      },
      complete: () => this.loading = false
    })
  }

  buscarTodasTransacoes() {
    this.transacaoService
      .listarTodas(this.tokenDecodeService.getId()!)
      .subscribe({
        next: (res) => {
          this.transacoes = res;
          this.transacoesTable = res.transacoes.map((transacao) => {
            return {
              id: transacao.id,
              nome: transacao.nome,
              tipoCategoria: transacao.categoria.tipo,
              valor: transacao.valor,
              dataTransacao: format(transacao.dataTransacao, 'dd/MM/yyyy'), 
            };
          });
        },
      });
  }

  buscarCategorias() {
    this.categoriaService.buscarCategorias().subscribe({
      next: (res) => {
        this.categorias = res;
        this.carregaCategoriasOpcoes();
      },
    });
  }

  carregaCategoriasOpcoes() {
    this.categoriasOpcoes = this.categorias.map((categoria) => ({
      label: categoria.nome,
      value: categoria.id,
    }));
  }


  deletarTransacao(id: string) {
    this.dialogService.openDialog({
      accept: () => this.confirmarDelete(id),
      message: 'Você tem certeza que deseja deletar essa transação?',
      header: 'Deletar Transação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
    });
  }


  confirmarDelete(id: string) {
    this.transacaoService.deletar(id).subscribe({
      next: () => {
        this.toastService.success(
          'Categoria',
          'Categoria deletada com sucesso!'
        );
        this.buscarTodasTransacoes();
      },
    });
  }

  handleDetalharTransacao(transacao: ITransacaoTable) {
    this.transacaoSelecionada = transacao;
    this.transacaoDialog = true;
  
    const categoriaCorrespondente = this.categorias.find(
      (categoria: any) => categoria.tipo === transacao.tipoCategoria
    );
    
    
    this.formGroup.patchValue({
      nome: transacao.nome,
      tipo: categoriaCorrespondente?.id ?? null,
      valor: transacao.valor,
      dataTransacao: transacao.dataTransacao,
    });

    this.formGroup.disable();
  
    this.carregaCategoriasOpcoes();
  }
  
}
