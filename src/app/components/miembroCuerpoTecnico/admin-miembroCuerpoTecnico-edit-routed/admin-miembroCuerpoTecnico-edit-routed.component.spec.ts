/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminMiembroCuerpoTecnicoEditRoutedComponent } from './admin-miembroCuerpoTecnico-edit-routed.component';

describe('AdminMiembroCuerpoTecnicoEditRoutedComponent', () => {
  let component: AdminMiembroCuerpoTecnicoEditRoutedComponent;
  let fixture: ComponentFixture<AdminMiembroCuerpoTecnicoEditRoutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMiembroCuerpoTecnicoEditRoutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMiembroCuerpoTecnicoEditRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
