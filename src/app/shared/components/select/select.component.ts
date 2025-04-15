import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-select',
  imports: [
    ReactiveFormsModule,
    SelectModule,
    FloatLabelModule,
    DropdownModule,
    CommonModule

  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent {
  @Input() items: { label: string; value: any }[] = [];
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() label: string = 'Selecionar';

  isInvalid(): boolean {
    const control = this.formGroup?.get(this.controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  getErrorMessage(): string {
    const control = this.formGroup.get(this.controlName);
    if (!control || !control.errors) return '';
  
    if (control.errors['required']) return 'Campo obrigatório.';
    if (control.errors['email']) return 'E-mail inválido.';
    if (control.errors['minlength']) return `Mínimo de ${control.errors['minlength'].requiredLength} caracteres.`;
    if (control.errors['maxlength']) return `Máximo de ${control.errors['maxlength'].requiredLength} caracteres.`;
  
    return 'Campo inválido.';
  }
}
