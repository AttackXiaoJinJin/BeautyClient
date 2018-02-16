import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareitemComponent } from './shareitem.component';

describe('ShareitemComponent', () => {
  let component: ShareitemComponent;
  let fixture: ComponentFixture<ShareitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
