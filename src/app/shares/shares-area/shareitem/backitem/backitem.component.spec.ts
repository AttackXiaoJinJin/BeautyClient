import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackitemComponent } from './backitem.component';

describe('BackitemComponent', () => {
  let component: BackitemComponent;
  let fixture: ComponentFixture<BackitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
