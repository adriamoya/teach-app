import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignaturesUpdateComponent } from './assignatures-update.component';

describe('AssignaturesUpdateDeleteComponent', () => {
  let component: AssignaturesUpdateComponent;
  let fixture: ComponentFixture<AssignaturesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignaturesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignaturesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
