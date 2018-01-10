import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiyanComponent } from './shiyan.component';

describe('ShiyanComponent', () => {
  let component: ShiyanComponent;
  let fixture: ComponentFixture<ShiyanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiyanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiyanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
