import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IEquipo, formOperation } from 'src/app/model/model.interfaces';
import { EquipoAjaxService } from 'src/app/service/equipo.ajax.service';
import { CALENDAR_ES } from 'src/environment/environment';

@Component({
  selector: 'app-admin-equipo-form-unrouted',
  templateUrl: './admin-equipo-form-unrouted.component.html',
  styleUrls: ['./admin-equipo-form-unrouted.component.css']
})
export class AdminEquipoFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  es = CALENDAR_ES;

  equipoForm!: FormGroup;
  oEquipo: IEquipo = {} as IEquipo;
  status: HttpErrorResponse | null = null;

  constructor(
    private oFormBuilder: FormBuilder,
    private oEquipoAjaxService: EquipoAjaxService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar
  ) {
    this.initializeForm(this.oEquipo);
  }

  initializeForm(oEquipo: IEquipo) {
    this.equipoForm = this.oFormBuilder.group({
      id: [oEquipo.id],
      nombre: [oEquipo.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      ciudad: [oEquipo.ciudad, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      ano_fundacion: [new Date(oEquipo.ano_fundacion), [Validators.required]],
      estadio: [oEquipo.estadio, [Validators.required, Validators.maxLength(255)]],
      liga: [oEquipo.liga, Validators.maxLength(255)],
      username: [oEquipo.username, [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
      role: [oEquipo.role, Validators.required],
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oEquipoAjaxService.getOne(this.id).subscribe({
        next: (data: IEquipo) => {
          this.oEquipo = data;
          this.initializeForm(this.oEquipo);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error reading user from server.", '', { duration: 2000 });
        }
      })
    } else {
      this.initializeForm(this.oEquipo);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.equipoForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.equipoForm.valid) {
      if (this.operation == 'NEW') {
        this.oEquipoAjaxService.newOne(this.equipoForm.value).subscribe({
          next: (data: IEquipo) => {
            this.oEquipo = data;
            this.initializeForm(this.oEquipo);
            // avisar al usuario que se ha creado correctamente
            this.oMatSnackBar.open("User has been created.", '', { duration: 2000 });
            this.oRouter.navigate(['/admin', 'user', 'view', this.oEquipo]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Can't create user.", '', { duration: 2000 });
          }
        })

      } else {
        this.oEquipoAjaxService.updateOne(this.equipoForm.value).subscribe({
          next: (data: IEquipo) => {
            this.oEquipo = data;
            this.initializeForm(this.oEquipo);
            // avisar al usuario que se ha actualizado correctamente
            this.oMatSnackBar.open("User has been updated.", '', { duration: 2000 });
            this.oRouter.navigate(['/admin', 'user', 'view', this.oEquipo.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("Can't update user.", '', { duration: 2000 });
          }
        })
      }
    }
  }

}