import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IEquipo, IEquipoPage } from 'src/app/model/model.interfaces';
import { AdminEquipoDetailUnroutedComponent } from '../admin-equipo-detail-unrouted/admin-equipo-detail-unrouted.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-admin-equipo-plist-unrouted',
  templateUrl: './admin-equipo-plist-unrouted.component.html',
  styleUrls: ['./admin-equipo-plist-unrouted.component.css']
})
export class AdminEquipoPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  oPage: IEquipoPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oEquipoToRemove: IEquipo | null = null;

  constructor(
    private oEquipoAjaxService: EquipoAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }

  getPage(): void {
    this.oEquipoAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IEquipoPage) => {
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

  ref: DynamicDialogRef | undefined;

  doView(e: IEquipo) {
    this.ref = this.oDialogService.open(AdminEquipoDetailUnroutedComponent, {
      data: {
        id: e.id
      },
      header: 'View of user',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(e: IEquipo) {
    this.oEquipoToRemove = e;
    this.oCconfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("The user has been removed.", '', { duration: 2000 });
        this.oEquipoAjaxService.removeOne(this.oEquipoToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("The user hasn't been removed.", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("The user hasn't been removed.", "", { duration: 2000 });
      }
    });
  }

}