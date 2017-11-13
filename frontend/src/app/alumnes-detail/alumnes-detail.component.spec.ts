import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnesDetailComponent } from './alumnes-detail.component';

describe('AlumnesDetailComponent', () => {
  let component: AlumnesDetailComponent;
  let fixture: ComponentFixture<AlumnesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
