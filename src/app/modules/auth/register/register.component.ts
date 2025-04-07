import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { IClientDTO } from '../../../interface/cliente.dto';
import { ToastService } from '../../../services/toast/toast.service';
import { InputComponent } from '../../../shared/components/input/input.component';
import { senhasIguaisValidator } from '../../../utils/validar-senhas';
import { InputPasswordComponent } from '../../../shared/components/input-password/input-password.component';
import { InputMaskComponent } from '../../../shared/components/input-mask/input-mask.component';
import { AuthService } from '../../../services/auth/auth.service';
import { removerPontuacao } from '../../../utils/remover-pontuacao';
import { IRegisterDTO } from '../../../interface/auth.dto';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    InputPasswordComponent,
    InputMaskComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  formGroup!: FormGroup;
  loading: boolean = false;
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  toastService = inject(ToastService);

  ngOnInit(): void {
    this.formGroup = this.fb.group(
      {
        nome: ['', Validators.required],
        telefone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
        cpf: ['', Validators.required],
      },
      {
        validators: [senhasIguaisValidator()],
      }
    );
  }
  submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const data: IRegisterDTO = {
      nome: this.formGroup.value.nome,
      telefone: removerPontuacao(this.formGroup.value.telefone),
      email: this.formGroup.value.email,
      senha: this.formGroup.value.senha,
      cpf: removerPontuacao(this.formGroup.value.cpf),
    };
    this.loading = true;
    this.authService.registrar(data).subscribe({
      next: () => {
        this.toastService.success('Cliente', 'Cadastro realizado com sucesso!');
        this.router.navigate(['/login'], {
          queryParams: {
            cpf: data.cpf,
          },
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
  handleGoToLogin() {
    this.router.navigate(['/login']);
  }
}
