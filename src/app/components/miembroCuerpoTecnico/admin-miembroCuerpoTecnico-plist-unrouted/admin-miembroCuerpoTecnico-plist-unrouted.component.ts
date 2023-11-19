import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IEquipo, IMiembroCuerpoTecnicoPage, IMiembroCuerpoTecnico } from 'src/app/model/model.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MiembroCuerpoTecnicoAjaxService } from 'src/app/service/miembroCuerpoTecnico.ajax.service';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service';
import { Subject } from 'rxjs';
import { AdminMiembroCuerpoTecnicoDetailUnroutedComponent } from './../admin-miembroCuerpoTecnico-detail-unrouted/admin-miembroCuerpoTecnico-detail-unrouted.component';

@Component({
  selector: 'app-admin-miembroCuerpoTecnico-plist-unrouted',
  templateUrl: './admin-miembroCuerpoTecnico-plist-unrouted.component.html',
  styleUrls: ['./admin-miembroCuerpoTecnico-plist-unrouted.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class AdminMiembroCuerpoTecnicoPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id_equipo: number = 0;

  oPage: IMiembroCuerpoTecnicoPage | undefined;
  oEquipo: IEquipo | null = null;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oMiembroCuerpoTecnicoToRemove: IMiembroCuerpoTecnico | null = null;
  ref: DynamicDialogRef | undefined;

  constructor(
    private oEquipoAjaxService: EquipoAjaxService,
    private oMiembroCuerpoTecnicoAjaxService: MiembroCuerpoTecnicoAjaxService,
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
    this.oMiembroCuerpoTecnicoAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_equipo).subscribe({
      next: (data: IMiembroCuerpoTecnicoPage) => {
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

  doView(u: IMiembroCuerpoTecnico) {
    this.ref = this.oDialogService.open(AdminMiembroCuerpoTecnicoDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'View of thread',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(u: IMiembroCuerpoTecnico) {
    this.oMiembroCuerpoTecnicoToRemove = u;
    this.oCconfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("Eliminado miembro del cuerpo técnico", '', { duration: 2000 });
        this.oMiembroCuerpoTecnicoAjaxService.removeOne(this.oMiembroCuerpoTecnicoToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("No ha sido eliminado el miembros del cuerpo técnico", "", { duration: 2000 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("No ha sido eliminado el miembros del cuerpo técnico", "", { duration: 2000 });
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