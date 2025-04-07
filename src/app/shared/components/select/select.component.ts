import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-select',
  imports: [
    ReactiveFormsModule,
    SelectModule,
    FloatLabelModule,
    DropdownModule

  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent {
  @Input() items: { label: string; value: any }[] = [];
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() label: string = 'Selecionar';

}
