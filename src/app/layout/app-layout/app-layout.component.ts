import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from "../menu-bar/menu-bar.component";
import { SideBarComponent } from "../side-bar/side-bar.component";
import { FloatMenssagemComponent } from "../float-menssagem/float-menssagem.component";

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, MenuBarComponent, MenuBarComponent, SideBarComponent, FloatMenssagemComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {

}
