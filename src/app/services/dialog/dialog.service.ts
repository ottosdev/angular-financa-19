import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
export interface DialogOptions {
  header?: string;
  message?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  icon?: string;
  accept?: () => void;
  reject?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private confirmationService: ConfirmationService,
  ) {}

  openDialog(options: DialogOptions) {

    const mergedOptions: DialogOptions = {
      header: 'Confirmação',
      message: 'Tem certeza?',
      acceptLabel: 'OK',
      rejectLabel: 'Cancelar',
      icon: 'pi pi-question-circle',
      ...options, 
    };

    this.confirmationService.confirm({
      header: mergedOptions.header,
      message: mergedOptions.message,
      icon: mergedOptions.icon,
      acceptLabel: mergedOptions.acceptLabel,
      rejectLabel: mergedOptions.rejectLabel,
      accept: () => {
        mergedOptions.accept?.();
      },
      reject: () => {
        mergedOptions.reject?.();
      },
    });
  }

}
