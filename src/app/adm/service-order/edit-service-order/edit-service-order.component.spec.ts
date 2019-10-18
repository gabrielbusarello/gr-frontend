import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceOrderComponent } from './edit-service-order.component';

describe('EditServiceOrderComponent', () => {
  let component: EditServiceOrderComponent;
  let fixture: ComponentFixture<EditServiceOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditServiceOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServiceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
