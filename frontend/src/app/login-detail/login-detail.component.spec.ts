import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDetailComponent } from './login-detail.component';

describe('LoginDetailComponent', () => {
  let component: LoginDetailComponent;
  let fixture: ComponentFixture<LoginDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
