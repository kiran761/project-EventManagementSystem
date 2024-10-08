import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuestComponent } from './add-guest.component';

describe('AddGuestComponent', () => {
  let component: AddGuestComponent;
  let fixture: ComponentFixture<AddGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
