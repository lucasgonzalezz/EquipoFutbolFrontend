import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service';
@Component({
  selector: 'app-admin-equipo-plist-routed',
  templateUrl: './admin-equipo-plist-routed.component.html',
  styleUrls: ['./admin-equipo-plist-routed.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class AdminEquipoPlistRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private oEquipoAjaxService: EquipoAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    console.log(amount);
    this.bLoading = true;
    this.oEquipoAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        console.log(amount);
        this.oMatSnackBar.open("Ahora hay " + oResponse + " equipos", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error al generar equipos: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget,
      message: 'Estás seguro de eliminar todos los equipos?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bLoading = true;
        this.oEquipoAjaxService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Ahora hay " + oResponse + " equipos", '', { duration: 2000 });
            this.bLoading = false;
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Error al vaciar equipos: " + oError.message, '', { duration: 2000 });
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