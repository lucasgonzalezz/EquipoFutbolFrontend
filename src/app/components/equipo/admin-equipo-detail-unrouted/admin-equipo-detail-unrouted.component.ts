import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IEquipo } from 'src/app/model/model.interfaces';
import { EquipoAjaxService } from '../../../service/equipo.ajax.service';

@Component({
  selector: 'app-admin-equipo-detail-unrouted',
  templateUrl: './admin-equipo-detail-unrouted.component.html',
  styleUrls: ['./admin-equipo-detail-unrouted.component.css']
})
export class AdminEquipoDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oEquipo: IEquipo = {} as IEquipo;
  status: HttpErrorResponse | null = null;

  constructor(
    private oEquipoAjaxService: EquipoAjaxService,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) {
    if (config) {
      if (config.data) {
        this.id = config.data.id;
      }
    }
  }

  ngOnInit() {
    console.log(this.id);
    this.getOne();
  }

  getOne(): void {
    this.oEquipoAjaxService.getOne(this.id).subscribe({
      next: (data: IEquipo) => {
        this.oEquipo = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })

  }

}