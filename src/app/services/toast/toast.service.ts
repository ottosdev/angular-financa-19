import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export type SeverityType =
  | 'success'
  | 'info'
  | 'warn'


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  severity: SeverityType = 'success';

  private messageService = inject(MessageService);

  success(summary: string, detail: string) {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  error(summary: string, detail: string) {
    this.messageService.add({ severity: 'error', summary, detail });
  }

  info(summary: string, detail: string) {
    this.messageService.add({ severity: 'info', summary, detail });
  }

  warn(summary: string, detail: string) {
    this.messageService.add({ severity: 'warn', summary, detail });
  }

  clear() {
    this.messageService.clear();
  }

  
}
