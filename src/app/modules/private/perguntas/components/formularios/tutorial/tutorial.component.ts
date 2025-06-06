import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'app-tutorial',
  imports: [
    CommonModule,
    StepsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.css',
})
export class TutorialComponent {
  steps: MenuItem[] = [];
  activeIndex = 0;
  finalizados: boolean[] = [false, false, false];
  formEtapas: FormGroup[] = [];

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.steps = [
      { label: 'Passo 1', icon: 'pi pi-user' },
      { label: 'Passo 2', icon: 'pi pi-envelope' },
      { label: 'Passo 3', icon: 'pi pi-map-marker' },
    ];
    

    this.formEtapas = [
      this.fb.group({
        nome: ['', Validators.required],
      }),
      this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      }),
      this.fb.group({
        cidade: ['', Validators.required],
      }),
    ];
  }

  salvarEAvancar(): void {
    const formAtual = this.formEtapas[this.activeIndex];

    if (formAtual.valid) {
      this.steps[this.activeIndex].icon = 'pi pi-check';
      if (this.activeIndex < this.steps.length - 1) {
        this.activeIndex++;
      }
    } else {
      formAtual.markAllAsTouched();
    }
  }

  isUltimoPasso(): boolean {
    return this.activeIndex === this.steps.length - 1;
  }

  voltarStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  getStepIcon(index: number): string {
    return this.finalizados[index] ? 'pi pi-check' : '';
  }

  get formAtual(): FormGroup {
    return this.formEtapas[this.activeIndex];
  }
}
