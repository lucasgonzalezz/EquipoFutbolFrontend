/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminMiembroCuerpoTecnicoSelectionUnroutedComponent } from './admin-miembroCuerpoTecnico-selection-unrouted.component';

describe('AdminMiembroCuerpoTecnicoSelectionUnroutedComponent', () => {
  let component: AdminMiembroCuerpoTecnicoSelectionUnroutedComponent;
  let fixture: ComponentFixture<AdminMiembroCuerpoTecnicoSelectionUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMiembroCuerpoTecnicoSelectionUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMiembroCuerpoTecnicoSelectionUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
