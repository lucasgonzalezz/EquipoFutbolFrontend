import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { MiembroCuerpoTecnicoAjaxService } from 'src/app/service/miembroCuerpoTecnico.ajax.service';

@Component({
  selector: 'app-admin-miembroCuerpoTecnico-plist-routed',
  templateUrl: './admin-miembroCuerpoTecnico-plist-routed.component.html',
  styleUrls: ['./admin-miembroCuerpoTecnico-plist-routed.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class AdminMiembroCuerpoTecnicoPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  id_equipo: number;
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oMiembroCuerpoTecnicoAjaxService: MiembroCuerpoTecnicoAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) {
    this.id_equipo = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") ?? "0");
  }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oMiembroCuerpoTecnicoAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Ahora hay " + oResponse + " miembros del cuerpo tecnico", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error al genenrar miembros del cuerpo tecnico: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget,
      message: 'Estás seguro de eliminar todos los miembros del cuerpo tecnico?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.oMiembroCuerpoTecnicoAjaxService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Ahora " + oResponse + " miembros del cuerpo tecnico", '', { duration: 2000 });
            this.bLoading = false;
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Error al vaciar miembros del cuerpo tecnico: " + oError.message, '', { duration: 2000 });
            this.bLoading = false;
          },
        })
      },
      reject: () => {
        this.oMatSnackBar.open("Vaciar cancelado!", '', { duration: 2000 });
      }
    });
  }

}