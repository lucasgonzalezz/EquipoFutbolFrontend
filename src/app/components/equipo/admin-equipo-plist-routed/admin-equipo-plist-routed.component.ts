import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private oEquopoAjaxService: EquipoAjaxService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oEquopoAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Now there are " + oResponse + " equipos", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generating equipos: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

  doEmpty() {
    this.oEquopoAjaxService.empty().subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Now there are " + oResponse + " equipos", '', { duration: 2000 });
        this.bLoading = false;
        this.forceReload.next(true);
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error emptying equipos: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    })
  }

}
