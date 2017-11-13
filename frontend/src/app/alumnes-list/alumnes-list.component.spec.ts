import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnesListComponent } from './alumnes-list.component';

describe('AlumnesListComponent', () => {
  let component: AlumnesListComponent;
  let fixture: ComponentFixture<AlumnesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
