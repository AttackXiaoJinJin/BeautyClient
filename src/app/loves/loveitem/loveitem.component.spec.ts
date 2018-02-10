import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveitemComponent } from './loveitem.component';

describe('LoveitemComponent', () => {
  let component: LoveitemComponent;
  let fixture: ComponentFixture<LoveitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoveitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoveitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
