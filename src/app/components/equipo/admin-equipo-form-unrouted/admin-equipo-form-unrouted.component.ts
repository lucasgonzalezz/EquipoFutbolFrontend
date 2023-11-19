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
  @Input() operation: formOperation = 'NEW';

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
    const ano_fundacionValue = oEquipo.ano_fundacion ? new Date(oEquipo.ano_fundacion) : null;
    this.equipoForm = this.oFormBuilder.group({
      id: [oEquipo.id],
      nombre: [oEquipo.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      ciudad: [oEquipo.ciudad, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      ano_fundacion: [ano_fundacionValue, [Validators.required]],
      estadio: [oEquipo.estadio, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      liga: [oEquipo.liga, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      username: [oEquipo.username, [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9]+$')]],
      role: [oEquipo.role, Validators.required]
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
          this.oMatSnackBar.open("Error al leer el usuario del servidor.", '', { duration: 2000 });
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
      const ano_fundacionValue = this.equipoForm.get('ano_fundacion')?.value;
      const formattedAnoFundacion = ano_fundacionValue ? new Date(ano_fundacionValue).toISOString().split('T')[0] : null;
      this.equipoForm.patchValue({ ano_fundacion: formattedAnoFundacion });
      if (this.operation == 'NEW') {
        this.oEquipoAjaxService.newOne(this.equipoForm.value).subscribe({
          next: (data: IEquipo) => {
            this.oEquipo = data;
            this.initializeForm(this.oEquipo);
            this.oMatSnackBar.open("Equipo creado.", '', { duration: 2000 });
            this.oRouter.navigate(['/admin', 'equipo', 'view', this.oEquipo]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("No se puede crear el equipo.", '', { duration: 2000 });
          }
        })

      } else {
        this.oEquipoAjaxService.updateOne(this.equipoForm.value).subscribe({
          next: (data: IEquipo) => {
            this.oEquipo = data;
            this.initializeForm(this.oEquipo);
            this.oMatSnackBar.open("Equipo actualizado.", '', { duration: 2000 });
            this.oRouter.navigate(['/admin', 'equipo', 'view', this.oEquipo.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("No se puede actualizar el equipo.", '', { duration: 2000 });
          }
        })
      }
    }
  }

}