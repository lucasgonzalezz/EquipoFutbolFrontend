import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IMiembroCuerpoTecnicoPage, IMiembroCuerpoTecnico } from 'src/app/model/model.interfaces';
import { MiembroCuerpoTecnicoAjaxService } from 'src/app/service/miembroCuerpoTecnico.ajax.service';

@Component({
  selector: 'app-admin-miembroCuerpoTecnico-selection-unrouted',
  templateUrl: './admin-miembroCuerpoTecnico-selection-unrouted.component.html',
  styleUrls: ['./admin-miembroCuerpoTecnico-selection-unrouted.component.css']
})
export class AdminMiembroCuerpoTecnicoSelectionUnroutedComponent implements OnInit {

  @Input() id_equipo: number = 0; //filter by user

  oPage: IMiembroCuerpoTecnicoPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oMiembroCuerpoTecnicoToRemove: IMiembroCuerpoTecnico | null = null;

  constructor(
    private oMiembroCuerpoTecnicoAjaxService: MiembroCuerpoTecnicoAjaxService,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oMiembroCuerpoTecnicoAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection, this.id_equipo).subscribe({
      next: (data: IMiembroCuerpoTecnicoPage) => {
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

  onSelectJuagdor(oMiembroCuerpoTecnico: IMiembroCuerpoTecnico) {
    this.oDynamicDialogRef.close(oMiembroCuerpoTecnico);
  }

}