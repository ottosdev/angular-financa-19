import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { ClienteService } from '../../../services/cliente/cliente.service';
@Component({
  selector: 'app-home',
  imports: [TabsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  activeTabIndex = '0';

  tabsLoaded: Record<string, boolean> = {
    '0': false,
    '1': false,
    '2': false,
  };


  ngOnInit() {
    this.onTabChange('0');
  }

  onTabChange(index: any) {
    if (!this.tabsLoaded[index]) {
      this.tabsLoaded[index] = true;
      this.carregarAba(index);
    }
  }

  carregarAba(index: string) {
    switch (index) {
      case '0':
        break;
      case '1':
        break;
      case '2':
        break;
    }
  }
}
