import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IEquipo, IMiembroCuerpoTecnico, formOperation } from 'src/app/model/model.interfaces';
import { MiembroCuerpoTecnicoAjaxService } from 'src/app/service/miembroCuerpoTecnico.ajax.service';
import { AdminEquipoSelectionUnroutedComponent } from './../../equipo/admin-equipo-selection-unrouted/admin-equipo-selection-unrouted.component';

@Component({
  selector: 'app-admin-miembroCuerpoTecnico-form-unrouted',
  templateUrl: './admin-miembroCuerpoTecnico-form-unrouted.component.html',
  styleUrls: ['./admin-miembroCuerpoTecnico-form-unrouted.component.css']
})
export class AdminMiembroCuerpoTecnicoFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  miembroCuerpoTecnicoForm!: FormGroup;
  oMiembroCuerpoTecnico: IMiembroCuerpoTecnico = { equipo: {} } as IMiembroCuerpoTecnico;
  status: HttpErrorResponse | null = null;

  oDynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private oMiembroCuerpoTecnicoAjaxService: MiembroCuerpoTecnicoAjaxService,
    private router: Router,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService
  ) {
    this.initializeForm(this.oMiembroCuerpoTecnico);
  }

  initializeForm(oMiembroCuerpoTecnico: IMiembroCuerpoTecnico) {
    const fecha_nacimientoValue = oMiembroCuerpoTecnico.fecha_nacimiento ? new Date(oMiembroCuerpoTecnico.fecha_nacimiento) : null;
    this.miembroCuerpoTecnicoForm = this.formBuilder.group({
      id: [oMiembroCuerpoTecnico.id],
      nombre: [oMiembroCuerpoTecnico.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      apellido: [oMiembroCuerpoTecnico.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      fecha_nacimiento: [fecha_nacimientoValue, [Validators.required]],
      nacionalidad: [oMiembroCuerpoTecnico.nacionalidad, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      titulo: [oMiembroCuerpoTecnico.titulo, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      equipo: this.formBuilder.group({
        id: [oMiembroCuerpoTecnico.equipo.id, Validators.required]
      })
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oMiembroCuerpoTecnicoAjaxService.getOne(this.id).subscribe({
        next: (data: IMiembroCuerpoTecnico) => {
          this.oMiembroCuerpoTecnico = data;
          this.initializeForm(this.oMiembroCuerpoTecnico);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error reading miembro del curerpo técnico del servidor.", '', { duration: 2000 });
        }
      })
    } else {
      this.initializeForm(this.oMiembroCuerpoTecnico);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.miembroCuerpoTecnicoForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.miembroCuerpoTecnicoForm.valid) {
      const fecha_nacimientoValue = this.miembroCuerpoTecnicoForm.get('fecha_nacimiento')?.value;
      const formattedFechaNAciemiento = fecha_nacimientoValue ? new Date(fecha_nacimientoValue).toISOString().split('T')[0] : null;
      this.miembroCuerpoTecnicoForm.patchValue({ fecha_nacimiento: formattedFechaNAciemiento });
      if (this.operation === 'NEW') {
        this.oMiembroCuerpoTecnicoAjaxService.newOne(this.miembroCuerpoTecnicoForm.value).subscribe({
          next: (data: IMiembroCuerpoTecnico) => {
            this.oMiembroCuerpoTecnico = { "equipo": {} } as IMiembroCuerpoTecnico;
            this.initializeForm(this.oMiembroCuerpoTecnico);
            this.oMatSnackBar.open('Miembro del cuerpo técnico creado.', '', { duration: 2000 });
            this.router.navigate(['/admin', 'miembroCuerpoTecnico', 'view', data]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Fallo al crear miembro del cuerpo técnico.', '', { duration: 2000 });
          }
        });
      } else {
        this.oMiembroCuerpoTecnicoAjaxService.updateOne(this.miembroCuerpoTecnicoForm.value).subscribe({
          next: (data: IMiembroCuerpoTecnico) => {
            this.oMiembroCuerpoTecnico = data;
            this.initializeForm(this.oMiembroCuerpoTecnico);
            this.oMatSnackBar.open('Miembro del cuerpo técnico actualizado.', '', { duration: 2000 });
            this.router.navigate(['/admin', 'miembroCuerpoTecnico', 'view', this.oMiembroCuerpoTecnico.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Fallo al actualizar miembro del cuerpo técnico', '', { duration: 2000 });
          }
        });
      }
    }
  }

  onShowEquiposSelection() {
    this.oDynamicDialogRef = this.oDialogService.open(AdminEquipoSelectionUnroutedComponent, {
      header: 'Select a Miembro de Cuerpo Tecnico',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.oDynamicDialogRef.onClose.subscribe((oEquipo: IEquipo) => {
      if (oEquipo) {
        this.oMiembroCuerpoTecnico.equipo = oEquipo;
        this.miembroCuerpoTecnicoForm.controls['equipo'].patchValue({ id: oEquipo.id })
      }
    });
  }

}