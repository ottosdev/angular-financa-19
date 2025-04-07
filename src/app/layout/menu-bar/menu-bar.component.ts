import { Component, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast/toast.service';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-bar',
  imports: [
    BadgeModule,
    AvatarModule,
    InputTextModule,
    CommonModule,
    MenubarModule,
    MenubarModule,
    MenuModule,
    ButtonModule
  ],

  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css',
})
export class MenuBarComponent {
  items: MenuItem[] | undefined;

  private toastService = inject(ToastService);
  private router = inject(Router);
  ngOnInit() {
    this.items = [
        {
            icon: 'pi pi-cof',
            items: [
                {
                    label: 'Perfil',
                    icon: 'pi pi-user',
                    command: () => this.router.navigate(['/perfil']),
                    
                }
            ]
        }
    ];
}

  handleCog() {
    this.toastService.info('Settings', 'Settings clicked');
  }

  handleBell() {
    this.toastService.info('Bell', 'Bell clicked');
  }
}
