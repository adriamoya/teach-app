import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvesUpdateComponent } from './proves-update.component';

describe('ProvesUpdateComponent', () => {
  let component: ProvesUpdateComponent;
  let fixture: ComponentFixture<ProvesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
