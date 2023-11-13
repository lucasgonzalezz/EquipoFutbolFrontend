/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminEquipoSelectionUnroutedComponent } from './admin-equipo-selection-unrouted.component';

describe('AdminEquipoSelectionUnroutedComponent', () => {
  let component: AdminEquipoSelectionUnroutedComponent;
  let fixture: ComponentFixture<AdminEquipoSelectionUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEquipoSelectionUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEquipoSelectionUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
