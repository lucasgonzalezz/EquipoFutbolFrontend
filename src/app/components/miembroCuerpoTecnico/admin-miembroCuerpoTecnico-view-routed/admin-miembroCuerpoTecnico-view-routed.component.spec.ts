/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminMiembroCuerpoTecnicoViewRoutedComponent } from './admin-miembroCuerpoTecnico-view-routed.component';

describe('AdminMiembroCuerpoTecnicoViewRoutedComponent', () => {
  let component: AdminMiembroCuerpoTecnicoViewRoutedComponent;
  let fixture: ComponentFixture<AdminMiembroCuerpoTecnicoViewRoutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMiembroCuerpoTecnicoViewRoutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMiembroCuerpoTecnicoViewRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
