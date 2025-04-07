import { Component, Input } from '@angular/core';
import { ButtonModule,  } from 'primeng/button';
@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() type: string = 'button';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() severity: any = 'primary';
}
