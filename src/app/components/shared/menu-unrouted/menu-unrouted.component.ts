import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IEquipo, SessionEvent } from 'src/app/model/model.interfaces';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {

  strEquipoName: string = "";
  oSessionEquipo: IEquipo | null = null;
  strUrl: string = "";

  constructor(
    private oSessionService: SessionAjaxService,
    private oEquipoAjaxService: EquipoAjaxService,
    public oDialogService: DialogService,
    private oRouter: Router
  ) {

    this.oRouter.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.strUrl = ev.url;
      }
    })

    this.strEquipoName = oSessionService.getUsername();
    this.oEquipoAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oEquipo: IEquipo) => {
        this.oSessionEquipo = oEquipo;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.oSessionService.on().subscribe({
      next: (data: SessionEvent) => {
        if (data.type == 'login') {
          this.strEquipoName = this.oSessionService.getUsername();
          this.oEquipoAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
            next: (oEquipo: IEquipo) => {
              this.oSessionEquipo = oEquipo;
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            }
          });
        }
        if (data.type == 'logout') {
          this.strEquipoName = "";
        }
      }
    });

  }
}