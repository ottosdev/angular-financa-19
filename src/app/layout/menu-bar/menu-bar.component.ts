import { Component, inject, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PerfilComponent } from '../../modules/private/perfil/perfil.component';
import { TabsModule } from 'primeng/tabs';
import {
  TokenDecodedService,
  TokenPayload,
} from '../../services/token/token-decoded.service';
import { AuthService } from '../../services/auth/auth.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { TotalizadoresComponent } from './totalizadores/totalizadores.component';

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
    ButtonModule,
    DrawerModule,
    PerfilComponent,
    TabsModule,
    TotalizadoresComponent
],

  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css',
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[] | undefined;
  visible: boolean = false;
  activeTabIndex: number = 0;
  payload: TokenPayload | null = null;

  tokenDecoded = inject(TokenDecodedService);
  private authService = inject(AuthService);
  private dialogService = inject(DialogService);


  tabsLoaded: Record<string, boolean> = {
    '0': false,
    '1': false,
    '2': false,
  };

  
  ngOnInit() {
    this.onTabChange('0');
    this.payload = this.tokenDecoded.getPayload();
  }

  onTabChange(index: any) {
    if (!this.tabsLoaded[index]) {
      this.tabsLoaded[index] = true;
    }
  }

  showLogoutToast() {
    this.dialogService.openDialog({
      message: 'Você tem certeza que deseja sair?',
      icon: 'pi pi-sign-out',
      accept: () => {
        this.hadnleLogout();
      },
    });
  }

  hadnleLogout() {
    this.authService.logout();
  }
}
