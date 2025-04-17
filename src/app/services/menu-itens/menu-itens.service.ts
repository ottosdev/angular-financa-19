import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
interface MenuItem {
  id: string; // Adicionado um identificador único para cada item
  text: string;
  icon: string;
  routerLink: string;
  isVisible: boolean;
  isActive?: boolean;
  subMenuLabels?: string[];
  subMenus?: MenuItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuItensService {
  private routerSubscription!: Subscription;

  private items: MenuItem[] = [
    {
      id: 'transacao',
      text: 'Transacao',
      icon: 'pi pi-wallet',
      routerLink: '/transacao',
      isVisible: true,
    },
    {
      id: 'categorias',
      text: 'Categoria',
      icon: 'pi pi-list',
      routerLink: '/categorias',
      isVisible: true,
      subMenuLabels:[ 'Subcategoria 2'],
      subMenus: [
        // {
        //   id: 'subcategoria',
        //   text: 'Subcategoria',
        //   icon: 'pi pi-wallet',
        //   routerLink: '/subcategorias',
        //   isVisible: true,
        // },
      ],
    }, // *Adicione mais itens conforme necessário
  ];

  constructor(private router: Router) {
    this.verificarMudançasDeRotas();
  }

  private verificarMudançasDeRotas(): void {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((navigationEvent: NavigationEnd) => {
        this.atualizarRotas(navigationEvent.urlAfterRedirects);
      });
  }

  private atualizarRotas(url: string): void {
    this.items.forEach((item) => (item.isActive = false));

    const activeItem = this.items.find((item) => url.includes(item.routerLink));
    if (activeItem) {
      activeItem.isActive = true;
    }
  }

  get menuItems(): MenuItem[] {
    return this.items;
  }

  getItemById(id: string): MenuItem | undefined {
    return this.items.find((item) => item.id === id);
  }

  setVisibilityById(id: string, visible: boolean): void {
    const item = this.getItemById(id);
    if (item) {
      item.isVisible = visible;
    }
  }
}
