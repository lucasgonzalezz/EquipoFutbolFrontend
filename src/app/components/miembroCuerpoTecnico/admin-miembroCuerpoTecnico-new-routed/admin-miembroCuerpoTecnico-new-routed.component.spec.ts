/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminMiembroCuerpoTecnicoNewRoutedComponent } from './admin-miembroCuerpoTecnico-new-routed.component';

describe('AdminMiembroCuerpoTecnicoNewRoutedComponent', () => {
  let component: AdminMiembroCuerpoTecnicoNewRoutedComponent;
  let fixture: ComponentFixture<AdminMiembroCuerpoTecnicoNewRoutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMiembroCuerpoTecnicoNewRoutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMiembroCuerpoTecnicoNewRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
