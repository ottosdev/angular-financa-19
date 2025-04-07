import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LoaderService } from './services/loader/loader.service';
import { BlockUIModule } from 'primeng/blockui';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, BlockUIModule, CommonModule, ConfirmDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'financa-estudo-front';

  public loaderService = inject(LoaderService);


}
