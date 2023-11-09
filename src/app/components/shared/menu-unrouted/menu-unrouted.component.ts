import { Component, OnInit } from '@angular/core';
import { SessionEvent } from 'src/app/model/model.interfaces';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {
  strEquipoName: string = "";
  menuItems: any[] = [];

  constructor(private oSessionService: SessionAjaxService) {}

  ngOnInit() {
    this.oSessionService.on().subscribe({
      next: (data: SessionEvent) => {
        if (data.type == 'login') {
          this.strEquipoName = this.oSessionService.getUsername();
        }
        if (data.type == 'logout') {
          this.strEquipoName = "";
        }
      }
    });

    // Definir la estructura del menú aquí
    this.menuItems = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Equipos', icon: 'pi pi-users', routerLink: '/admin/equipo/plist', visible: this.strEquipoName !== '' },
      { label: 'Jugadores', icon: 'pi pi-user', routerLink: '/admin/jugador/plist', visible: this.strEquipoName !== '' },
      { label: 'Miembros Cuerpo Técnico', icon: 'pi pi-cog', routerLink: '/admin/miembroCuerpoTecnico/plist', visible: this.strEquipoName !== '' },
    ];
  }
}
