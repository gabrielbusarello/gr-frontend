import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceTypeComponent } from './edit-service-type.component';

describe('EditServiceTypeComponent', () => {
  let component: EditServiceTypeComponent;
  let fixture: ComponentFixture<EditServiceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditServiceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
