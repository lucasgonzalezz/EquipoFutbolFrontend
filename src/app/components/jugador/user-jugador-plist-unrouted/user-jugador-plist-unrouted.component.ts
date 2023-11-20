import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IJugador, IJugadorPage, IEquipo } from 'src/app/model/model.interfaces';
import { AdminJugadorDetailUnroutedComponent } from '../admin-jugador-detail-unrouted/admin-jugador-detail-unrouted.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JugadorAjaxService } from 'src/app/service/jugador.ajax.service';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service';
import { Subject } from 'rxjs';
import { AdminJugadorFormUnroutedComponent } from './../admin-jugador-form-unrouted/admin-jugador-form-unrouted.component';

@Component({
  providers: [ConfirmationService],
  selector: 'app-user-jugador-plist-unrouted',
  templateUrl: './user-jugador-plist-unrouted.component.html',
  styleUrls: ['./user-jugador-plist-unrouted.component.css']
})
export class UserJugadorPlistUnroutedComponent implements OnInit {

  @Input() id_equipo: number = 0;
  @Input() reload: Subject<boolean> = new Subject<boolean>();
  @Output() jugador_selection = new EventEmitter<IJugador>();

  activeOrder: boolean = true;
  activeJugador: IJugador | null = null;
  oSessionEquipo: IEquipo | null = null;
  strEquipoName: string = "";

  oPage: IJugadorPage | undefined;
  oEquipo: IEquipo | null = null;
  orderField: string = "id";
  orderDirection: string = "desc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oJugadorToRemove: IJugador | null = null;
  ref: DynamicDialogRef | undefined;

  constructor(
    private oEquipoAjaxService: EquipoAjaxService,
    public oSessionService: SessionAjaxService,
    private oJugadorAjaxService: JugadorAjaxService,
    public oDialogService: DialogService,
  ) { 
    

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
    this.reload.subscribe(response => {
      if (response) {
        if (this.activeOrder) {
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
      }
    });
    if (this.activeOrder) {
      this.getPage();
    }
    if (this.id_equipo > 0) {
      this.getUser();
    }
  }

  getPage(): void {
    this.oJugadorAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_equipo).subscribe({
      next: (data: IJugadorPage) => {
        this.oPage = data;
        if (this.oPage.content.length > 0) {
          this.activeJugador = this.oPage.content[0];
          this.jugador_selection.emit(this.activeJugador);
        }
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    if (this.activeOrder) {
      this.getPage();
    }
  }

  getUser(): void {
    this.oEquipoAjaxService.getOne(this.id_equipo).subscribe({
      next: (data: IEquipo) => {
        this.oEquipo = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })
  }

  doShowEquipo(oJugador: IJugador) {
    this.jugador_selection.emit(oJugador);
    this.activeJugador = oJugador;
    return false;
  }

  onOrderChange(event: any) {
    this.activeOrder = !this.activeOrder;
    this.orderDirection = "desc";
    if (this.activeOrder) {
      this.getPage();
    }
  }

  deleteJugador(jugadorId: number): void {
    this.oJugadorAjaxService.removeOne(jugadorId).subscribe({
      next: () => {
        // Deletion successful, reset the activeJugador and reload the page
        this.activeJugador = null;
        this.reload.next(true);
      },
      error: (error: HttpErrorResponse) => {
        // Handle error, display a message or log it
        console.error(error);
      }
    });
  }
  
}