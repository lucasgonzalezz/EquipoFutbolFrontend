import { Component, OnInit, Input, Optional } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IJugador } from 'src/app/model/model.interfaces';
import { JugadorAjaxService } from 'src/app/service/jugador.ajax.service';

@Component({
  selector: 'app-admin-jugador-detail-unrouted',
  templateUrl: './admin-jugador-detail-unrouted.component.html',
  styleUrls: ['./admin-jugador-detail-unrouted.component.css']
})
export class AdminJugadorDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oJugador: IJugador = { equipo: {} } as IJugador;
  status: HttpErrorResponse | null = null;

  constructor(
    private oJugadorAjaxService: JugadorAjaxService,
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
    this.oJugadorAjaxService.getOne(this.id).subscribe({
      next: (data: IJugador) => {
        this.oJugador = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })

  }

}