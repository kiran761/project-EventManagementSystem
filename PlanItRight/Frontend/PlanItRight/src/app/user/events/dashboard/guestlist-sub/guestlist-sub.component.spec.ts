import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestlistSubComponent } from './guestlist-sub.component';

describe('GuestlistSubComponent', () => {
  let component: GuestlistSubComponent;
  let fixture: ComponentFixture<GuestlistSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestlistSubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestlistSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
