import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharesMyareaComponent } from './shares-myarea.component';

describe('SharesMyareaComponent', () => {
  let component: SharesMyareaComponent;
  let fixture: ComponentFixture<SharesMyareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharesMyareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharesMyareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
