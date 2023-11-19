import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IEquipo, IJugador, formOperation } from 'src/app/model/model.interfaces';
import { JugadorAjaxService } from 'src/app/service/jugador.ajax.service';
import { AdminEquipoSelectionUnroutedComponent } from './../../equipo/admin-equipo-selection-unrouted/admin-equipo-selection-unrouted.component';

@Component({
  selector: 'app-admin-jugador-form-unrouted',
  templateUrl: './admin-jugador-form-unrouted.component.html',
  styleUrls: ['./admin-jugador-form-unrouted.component.css']
})
export class AdminJugadorFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  jugadorForm!: FormGroup;
  oJugador: IJugador = { equipo: {} } as IJugador;
  status: HttpErrorResponse | null = null;

  oDynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private oJugadorAjaxService: JugadorAjaxService,
    private router: Router,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService
  ) {
    this.initializeForm(this.oJugador);
  }

  initializeForm(oJugador: IJugador) {
    const fecha_nacimientoValue = oJugador.fecha_nacimiento ? new Date(oJugador.fecha_nacimiento) : null;
    this.jugadorForm = this.formBuilder.group({
      id: [oJugador.id],
      nombre: [oJugador.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      apellido: [oJugador.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      fecha_nacimiento: [fecha_nacimientoValue, [Validators.required]],
      posicion: [oJugador.posicion, [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
      nacionalidad: [oJugador.nacionalidad, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      equipo: this.formBuilder.group({
        id: [oJugador.equipo.id, Validators.required]
      })
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oJugadorAjaxService.getOne(this.id).subscribe({
        next: (data: IJugador) => {
          this.oJugador = data;
          this.initializeForm(this.oJugador);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error al leer jugador en el servidor.", '', { duration: 2000 });
        }
      })
    } else {
      this.initializeForm(this.oJugador);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.jugadorForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.jugadorForm.valid) {
      const fecha_nacimientoValue = this.jugadorForm.get('fecha_nacimiento')?.value;
      const formattedFechaNAciemiento = fecha_nacimientoValue ? new Date(fecha_nacimientoValue).toISOString().split('T')[0] : null;
      this.jugadorForm.patchValue({ fecha_nacimiento: formattedFechaNAciemiento });
      if (this.operation === 'NEW') {
        this.oJugadorAjaxService.newOne(this.jugadorForm.value).subscribe({
          next: (data: IJugador) => {
            this.oJugador = { "equipo": {} } as IJugador;
            this.initializeForm(this.oJugador); //el id se genera en el servidor
            this.oMatSnackBar.open('Jugador creado.', '', { duration: 2000 });
            this.router.navigate(['/admin', 'jugador', 'view', data]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Error crear jugador.', '', { duration: 2000 });
          }
        });
      } else {
        this.oJugadorAjaxService.updateOne(this.jugadorForm.value).subscribe({
          next: (data: IJugador) => {
            this.oJugador = data;
            this.initializeForm(this.oJugador);
            this.oMatSnackBar.open('Jugador actualizado.', '', { duration: 2000 });
            this.router.navigate(['/admin', 'jugador', 'view', this.oJugador.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Error al actualizar jugador.', '', { duration: 2000 });
          }
        });
      }
    }
  }

  onShowEquiposSelection() {
    this.oDynamicDialogRef = this.oDialogService.open(AdminEquipoSelectionUnroutedComponent, {
      header: 'Select a Equipo',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.oDynamicDialogRef.onClose.subscribe((oEquipo: IEquipo) => {
      if (oEquipo) {
        this.oJugador.equipo = oEquipo;
        this.jugadorForm.controls['equipo'].patchValue({ id: oEquipo.id })
      }
    });
  }

}