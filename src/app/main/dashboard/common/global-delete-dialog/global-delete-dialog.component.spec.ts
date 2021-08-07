import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDeleteDialogComponent } from './global-delete-dialog.component';

describe('GlobalDeleteDialogComponent', () => {
  let component: GlobalDeleteDialogComponent;
  let fixture: ComponentFixture<GlobalDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
