import { Component, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { SpeedDial } from 'primeng/speeddial';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from "../../shared/components/input/input.component";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { OpenaiService } from '../../services/openai/openai.service';

@Component({
  selector: 'app-float-menssagem',
  standalone: true,
  imports: [CommonModule, SpeedDial, ToastModule, DialogModule, InputTextModule,ReactiveFormsModule, FormsModule, InputComponent, ButtonComponent],
  templateUrl: './float-menssagem.component.html',
  styleUrl: './float-menssagem.component.css'
})
export class FloatMenssagemComponent {
  items!: MenuItem[];
  formGroup!: FormGroup;
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private openAiService = inject(OpenaiService)

  showDialog = false;
  mensagem = '';
  mensagensEnviadas: string[] = [];

  ngOnInit() {
    this.items = [
      {
        icon: 'pi pi-pencil',
        command: () => {
          this.abrirDialog();
        }
      }
    ];

    this.formGroup = this.fb.group({
      mensagem: ['', Validators.required]
    });
  }

  abrirDialog() {
    this.showDialog = true;
  }

  enviarMensagem() {
    if(this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.openAiService.gerarMensagem(this.formGroup.value.mensagem).subscribe({
      next: res => {
        console.log(res)
      }
    })
  }
}
