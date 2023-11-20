import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { IEquipo, IEquipoPage } from 'src/app/model/model.interfaces';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service';

@Component({
  selector: 'app-user-equipo-featured-unrouted',
  templateUrl: './user-equipo-featured-unrouted.component.html',
  styleUrls: ['./user-equipo-featured-unrouted.component.css']
})
export class UserEquipoFeaturedUnroutedComponent implements OnInit {

  oPage: IEquipoPage | undefined;
  oPaginatorState: PaginatorState = { first: 0, rows: 100, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oEquipoToRemove: IEquipo | null = null;

  constructor(
    private oEquipoAjaxService: EquipoAjaxService,
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oEquipoAjaxService.getPageByJugadoresNumberDesc(this.oPaginatorState.rows, this.oPaginatorState.page).subscribe({
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

}
