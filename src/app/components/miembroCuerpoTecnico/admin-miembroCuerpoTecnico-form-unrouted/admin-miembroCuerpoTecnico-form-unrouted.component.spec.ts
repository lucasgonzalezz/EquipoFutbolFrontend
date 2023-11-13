/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminMiembroCuerpoTecnicoFormUnroutedComponent } from './admin-miembroCuerpoTecnico-form-unrouted.component';

describe('AdminMiembroCuerpoTecnicoFormUnroutedComponent', () => {
  let component: AdminMiembroCuerpoTecnicoFormUnroutedComponent;
  let fixture: ComponentFixture<AdminMiembroCuerpoTecnicoFormUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMiembroCuerpoTecnicoFormUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMiembroCuerpoTecnicoFormUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
