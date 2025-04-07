import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { DialogService } from '../../services/dialog/dialog.service';
import {
  TokenDecodedService,
  TokenPayload,
} from '../../services/token/token-decoded.service';
@Component({
  selector: 'app-side-bar',
  imports: [
    AvatarModule,
    DrawerModule,
    ButtonModule,
    CommonModule,
    MenuModule,
    RouterModule,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  visible: boolean = false;
  payload: TokenPayload | null = null;
  items: MenuItem[] | undefined;

  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);
  private dialogService = inject(DialogService);
  private tokenDecoded = inject(TokenDecodedService);

  ngOnInit() {
    this.criarMenu();
    this.detectarMudançasRotas();

    this.payload = this.tokenDecoded.getPayload();
  }

  handleVisibled() {
    this.visible = !this.visible;
  }

  rotaAtiva(routerLink: string): boolean {
    if (!routerLink || routerLink.length === 0) {
      return false;
    }

    if (routerLink === '/') {
      return this.router.url === '/';
    }

    return this.router.url.startsWith(routerLink);
  }

  detectarMudançasRotas() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  criarMenu() {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Categorias', icon: 'pi pi-list', routerLink: '/categorias' },
    ];
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
