/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminMiembroCuerpoTecnicoDetailUnroutedComponent } from './admin-miembroCuerpoTecnico-detail-unrouted.component';

describe('AdminMiembroCuerpoTecnicoDetailUnroutedComponent', () => {
  let component: AdminMiembroCuerpoTecnicoDetailUnroutedComponent;
  let fixture: ComponentFixture<AdminMiembroCuerpoTecnicoDetailUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMiembroCuerpoTecnicoDetailUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMiembroCuerpoTecnicoDetailUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
