import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputPasswordComponent } from '../../../shared/components/input-password/input-password.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputMaskComponent } from '../../../shared/components/input-mask/input-mask.component';
import { removerPontuacao } from '../../../utils/remover-pontuacao';
import { ILoginDTO } from '../../../interface/auth.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputPasswordComponent,
    ButtonComponent,
    ButtonModule,
    InputMaskComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  route = inject(ActivatedRoute);

  loading: boolean = false;

  ngOnInit(): void {
    this.criarFormulario();

    const emailParam = this.route.snapshot.queryParamMap.get('cpf');

    if (emailParam) {
      this.formGroup.patchValue({ cpf: emailParam });
    }
  }

  criarFormulario() {
    this.formGroup = this.fb.group({
      cpf: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.loading = true;

    const data: ILoginDTO = {
      cpf: removerPontuacao(this.formGroup.value.cpf),
      senha: this.formGroup.value.senha,
    }

    this.authService.login(data).subscribe({
      next: (response) => {
        this.authService.setLocalStorage(response);
        this.router.navigate(['/transacao']);
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }

  handleGoToRegister() {
    this.router.navigate(['/register']);
  }
}
