import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvesCreateComponent } from './proves-create.component';

describe('ProvesCreateComponent', () => {
  let component: ProvesCreateComponent;
  let fixture: ComponentFixture<ProvesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
