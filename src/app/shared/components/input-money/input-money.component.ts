import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-input-money',
  imports: [FloatLabel, InputNumberModule, ReactiveFormsModule, CommonModule],
  templateUrl: './input-money.component.html',
  styleUrl: './input-money.component.css'
})
export class InputMoneyComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = '';
  @Input() mask: string = '';

  isInvalid(): boolean {
    const control = this.formGroup?.get(this.controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }
}
