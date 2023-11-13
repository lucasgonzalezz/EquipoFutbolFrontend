/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserEquipoFeaturedUnroutedComponent } from './user-equipo-featured-unrouted.component';

describe('UserEquipoFeaturedUnroutedComponent', () => {
  let component: UserEquipoFeaturedUnroutedComponent;
  let fixture: ComponentFixture<UserEquipoFeaturedUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEquipoFeaturedUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEquipoFeaturedUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
