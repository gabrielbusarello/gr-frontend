import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWtComponent } from './edit-wt.component';

describe('EditWtComponent', () => {
  let component: EditWtComponent;
  let fixture: ComponentFixture<EditWtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
