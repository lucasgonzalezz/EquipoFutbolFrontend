/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserMiembroCuerpoTecnicoPlistUnroutedComponent } from './user-miembroCuerpoTecnico-plist-unrouted.component';

describe('UserMiembroCuerpoTecnicoPlistUnroutedComponent', () => {
  let component: UserMiembroCuerpoTecnicoPlistUnroutedComponent;
  let fixture: ComponentFixture<UserMiembroCuerpoTecnicoPlistUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMiembroCuerpoTecnicoPlistUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMiembroCuerpoTecnicoPlistUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
