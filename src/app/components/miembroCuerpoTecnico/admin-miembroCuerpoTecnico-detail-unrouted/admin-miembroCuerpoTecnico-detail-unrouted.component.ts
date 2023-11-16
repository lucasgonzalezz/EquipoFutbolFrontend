import { Component, OnInit, Input, Optional } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IMiembroCuerpoTecnico } from 'src/app/model/model.interfaces';
import { MiembroCuerpoTecnicoAjaxService } from 'src/app/service/miembroCuerpoTecnico.ajax.service';

@Component({
  selector: 'app-admin-miembroCuerpoTecnico-detail-unrouted',
  templateUrl: './admin-miembroCuerpoTecnico-detail-unrouted.component.html',
  styleUrls: ['./admin-miembroCuerpoTecnico-detail-unrouted.component.css']
})
export class AdminMiembroCuerpoTecnicoDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oMiembroCuerpoTecnico: IMiembroCuerpoTecnico = { equipo: {} } as IMiembroCuerpoTecnico;
  status: HttpErrorResponse | null = null;

  constructor(
    private oMiembroCuerpoTecnicoAjaxService: MiembroCuerpoTecnicoAjaxService,
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
    this.getOne();
  }

  getOne(): void {
    this.oMiembroCuerpoTecnicoAjaxService.getOne(this.id).subscribe({
      next: (data: IMiembroCuerpoTecnico) => {
        this.oMiembroCuerpoTecnico = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })

  }

}