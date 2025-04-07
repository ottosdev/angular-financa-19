import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-input',
  imports: [
    InputTextModule,
    FloatLabel,
    ReactiveFormsModule,
    PasswordModule,
    CommonModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = '';

  isInvalid(): boolean {
    const control = this.formGroup?.get(this.controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  getErrorMessage(): string {
    const control = this.formGroup.get(this.controlName);
    if (!control || !control.errors) return '';

    if (this.senhasMatchs()) {
      return 'As senhas não coincidem.';
    }
  
    if (control.errors['required']) return 'Campo obrigatório.';
    if (control.errors['email']) return 'E-mail inválido.';
    if (control.errors['minlength']) return `Mínimo de ${control.errors['minlength'].requiredLength} caracteres.`;
    if (control.errors['maxlength']) return `Máximo de ${control.errors['maxlength'].requiredLength} caracteres.`;
  
    return 'Campo inválido.';
  }

  private senhasMatchs(): boolean | undefined{
    return (
      this.controlName === 'confirmarSenha' &&
      this.formGroup.hasError('senhasDiferentes') &&
      this.formGroup.get('confirmarSenha')?.touched
    );
  }
}
