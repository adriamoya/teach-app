import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvesDetailComponent } from './proves-detail.component';

describe('ProvesDetailComponent', () => {
  let component: ProvesDetailComponent;
  let fixture: ComponentFixture<ProvesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
