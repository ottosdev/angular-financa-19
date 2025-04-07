import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClienteService } from '../../../services/cliente/cliente.service';
import {
  TokenDecodedService,
  TokenPayload,
} from '../../../services/token/token-decoded.service';
import { IClientDTO } from '../../../interface/cliente.dto';
import { InputComponent } from '../../../shared/components/input/input.component';
import { InputMaskComponent } from '../../../shared/components/input-mask/input-mask.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ToastService } from '../../../services/toast/toast.service';
@Component({
  selector: 'app-perfil',
  imports: [
    CardModule,
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    InputMaskComponent,
    ButtonComponent,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  formgroup!: FormGroup;
  payload: TokenPayload | null = null;
  clientes!: IClientDTO;
  loading: boolean = false;

  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private tokenDecodeService = inject(TokenDecodedService);
  private toastService = inject(ToastService);

  ngOnInit() {
    this.payload = this.tokenDecodeService.getPayload();
    this.criarFormulario();
    this.obterDadosCliente();
  }

  criarFormulario() {
    this.formgroup = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      cpf: [{ value: '', disabled: true }, Validators.required],
      telefone: ['', Validators.required],
      endereco: this.fb.group({
        id: [null],
        logradouro: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      }),
    });
  }

  get enderecoForm() {
    return this.formgroup.get('endereco') as FormGroup;
  }

  onSubmit() {
    if(this.formgroup.invalid) {
      this.formgroup.markAllAsTouched();
      return;
    }
    this.loading = true;
    let cliente: IClientDTO = this.formgroup.value;
    cliente = {
      ...cliente,
      cpf: this.clientes.cpf,
      email: this.clientes.email,
    }
    
    this.clienteService.atualizarCliente(cliente).subscribe({
      next: (res) => {
        this.toastService.success('Sucesso','Cliente atualizado com sucesso:');
        this.loading = false;
        this.obterDadosCliente(); 
      },
      error: (err) => {
        this.toastService.error('Erro ao atualizar cliente', 'Erro');
        this.loading = false;
      },
    });
  }

  obterDadosCliente() {
    this.clienteService.buscarClientePorId(this.payload!.id).subscribe({
      next: (res) => {
        this.clientes = res;
        
        const endereco = this.clientes.endereco ?? {};
        this.formgroup.patchValue({
          id: this.clientes.id,
          nome: this.clientes.nome,
          email: this.clientes.email,
          telefone: this.clientes.telefone,
          cpf: this.clientes.cpf,
          endereco: {
            id: endereco.id ?? null,
            logradouro: endereco.logradouro ?? '',
            numero: endereco.numero ?? '',
            complemento: endereco.complemento ?? '',
            bairro: endereco.bairro ?? '',
            cidade: endereco.cidade ?? '',
            uf: endereco.uf ?? '',
          },
        });
      },
      error: (err) => {
        console.error('Erro ao buscar cliente:', err);
      },
    });
  }
}
