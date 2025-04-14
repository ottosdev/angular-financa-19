import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-input-mask',
  imports: [FloatLabel, InputMaskModule, ReactiveFormsModule, CommonModule],
  templateUrl: './input-mask.component.html',
  styleUrl: './input-mask.component.css'
})
export class InputMaskComponent {
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
