import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service';
@Component({
  selector: 'app-admin-equipo-plist-routed',
  templateUrl: './admin-equipo-plist-routed.component.html',
  styleUrls: ['./admin-equipo-plist-routed.component.css']
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
        this.oMatSnackBar.open("Now there are " + oResponse + " equipos", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generating equipos: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget,
      message: 'Are you sure that you want to remove all the users?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bLoading = true; // Set loading to true while processing
        this.oEquipoAjaxService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Now there are " + oResponse + " users", '', { duration: 2000 });
            this.bLoading = false; // Set loading to false after successful deletion
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Error emptying users: " + oError.message, '', { duration: 2000 });
            this.bLoading = false; // Set loading to false on error
          },
        })
      },
      reject: () => {
        this.oMatSnackBar.open("Empty Cancelled!", '', { duration: 2000 });
      }
    });
  }
  

}