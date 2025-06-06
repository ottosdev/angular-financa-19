import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-form-layout',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.css'
})
export class FormLayoutComponent {

  private router = inject(Router);

  voltar() {
    this.router.navigate(['/perguntas']);
  }

}
