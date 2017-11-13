import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignaturesDetailComponent } from './assignatures-detail.component';

describe('AssignaturesDetailComponent', () => {
  let component: AssignaturesDetailComponent;
  let fixture: ComponentFixture<AssignaturesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignaturesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignaturesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
