/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminMiembroCuerpoTecnicoPlistUnroutedComponent } from './admin-miembroCuerpoTecnico-plist-unrouted.component';

describe('AdminMiembroCuerpoTecnicoPlistUnroutedComponent', () => {
  let component: AdminMiembroCuerpoTecnicoPlistUnroutedComponent;
  let fixture: ComponentFixture<AdminMiembroCuerpoTecnicoPlistUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMiembroCuerpoTecnicoPlistUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMiembroCuerpoTecnicoPlistUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
