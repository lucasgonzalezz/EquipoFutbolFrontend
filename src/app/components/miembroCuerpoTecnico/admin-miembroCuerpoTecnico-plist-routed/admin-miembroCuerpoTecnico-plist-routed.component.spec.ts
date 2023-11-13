/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminMiembroCuerpoTecnicoPlistRoutedComponent } from './admin-miembroCuerpoTecnico-plist-routed.component';

describe('AdminMiembroCuerpoTecnicoPlistRoutedComponent', () => {
  let component: AdminMiembroCuerpoTecnicoPlistRoutedComponent;
  let fixture: ComponentFixture<AdminMiembroCuerpoTecnicoPlistRoutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMiembroCuerpoTecnicoPlistRoutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMiembroCuerpoTecnicoPlistRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
