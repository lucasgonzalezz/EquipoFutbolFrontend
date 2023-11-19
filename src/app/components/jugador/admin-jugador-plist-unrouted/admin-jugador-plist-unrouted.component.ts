import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IJugador, IJugadorPage, IEquipo } from 'src/app/model/model.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JugadorAjaxService } from 'src/app/service/jugador.ajax.service';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service';
import { Subject } from 'rxjs';
import { AdminJugadorDetailUnroutedComponent } from './../admin-jugador-detail-unrouted/admin-jugador-detail-unrouted.component';

@Component({
  selector: 'app-admin-jugador-plist-unrouted',
  templateUrl: './admin-jugador-plist-unrouted.component.html',
  styleUrls: ['./admin-jugador-plist-unrouted.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class AdminJugadorPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_equipo: number = 0;

  oPage: IJugadorPage | undefined;
  oEquipo: IEquipo | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oJugadorToRemove: IJugador | null = null;
  ref: DynamicDialogRef | undefined;

  constructor(
    private oEquipoAjaxService: EquipoAjaxService,
    private oJugadorAjaxService: JugadorAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.id_equipo > 0) {
      this.getEquipo();
    }
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }

  getPage(): void {
    this.oJugadorAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_equipo).subscribe({
      next: (data: IJugadorPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  doView(u: IJugador) {
    this.ref = this.oDialogService.open(AdminJugadorDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'Vita de jugador',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(u: IJugador) {
    this.oJugadorToRemove = u;
    this.oCconfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("El jugador ha sido eliminado.", '', { duration: 2000 });
        this.oJugadorAjaxService.removeOne(this.oJugadorToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("El jugador no ha sido eliminado.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("El jugador no ha sido eliminado.", "", { duration: 2000 });
      }
    });
  }

  getEquipo(): void {
    this.oEquipoAjaxService.getOne(this.id_equipo).subscribe({
      next: (data: IEquipo) => {
        this.oEquipo = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }

}