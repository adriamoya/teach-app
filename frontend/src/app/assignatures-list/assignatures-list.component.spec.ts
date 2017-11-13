import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignaturesListComponent } from './assignatures-list.component';

describe('AssignaturesListComponent', () => {
  let component: AssignaturesListComponent;
  let fixture: ComponentFixture<AssignaturesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignaturesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignaturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
