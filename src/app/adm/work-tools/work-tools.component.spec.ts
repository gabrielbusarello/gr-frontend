import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkToolsComponent } from './work-tools.component';

describe('WorkToolsComponent', () => {
  let component: WorkToolsComponent;
  let fixture: ComponentFixture<WorkToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
