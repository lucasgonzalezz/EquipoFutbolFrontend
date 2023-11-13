/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserMiembroCuerpoTecnicoFeaturedUnroutedComponent } from './user-miembroCuerpoTecnico-featured-unrouted.component';

describe('UserMiembroCuerpoTecnicoFeaturedUnroutedComponent', () => {
  let component: UserMiembroCuerpoTecnicoFeaturedUnroutedComponent;
  let fixture: ComponentFixture<UserMiembroCuerpoTecnicoFeaturedUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMiembroCuerpoTecnicoFeaturedUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMiembroCuerpoTecnicoFeaturedUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
