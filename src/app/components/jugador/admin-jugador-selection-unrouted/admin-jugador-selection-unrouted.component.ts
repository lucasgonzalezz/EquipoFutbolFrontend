import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IJugador, IJugadorPage } from 'src/app/model/model.interfaces';
import { JugadorAjaxService } from 'src/app/service/jugador.ajax.service';

@Component({
  selector: 'app-admin-jugador-selection-unrouted',
  templateUrl: './admin-jugador-selection-unrouted.component.html',
  styleUrls: ['./admin-jugador-selection-unrouted.component.css']
})
export class AdminJugadorSelectionUnroutedComponent implements OnInit {

  @Input() id_equipo: number = 0; //filter by user

  oPage: IJugadorPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oJugadorToRemove: IJugador | null = null;

  constructor(
    private oJugadorAjaxService: JugadorAjaxService,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oJugadorAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_equipo).subscribe({
      next: (data: IJugadorPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
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

  onSelectJuagdor(oJugador: IJugador) {
    this.oDynamicDialogRef.close(oJugador);
  }

}