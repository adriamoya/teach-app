import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignaturesCreateComponent } from './assignatures-create.component';

describe('AssignaturesCreateComponent', () => {
  let component: AssignaturesCreateComponent;
  let fixture: ComponentFixture<AssignaturesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignaturesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignaturesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
