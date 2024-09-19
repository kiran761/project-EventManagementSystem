import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetVendorsComponent } from './budget-vendors.component';

describe('BudgetVendorsComponent', () => {
  let component: BudgetVendorsComponent;
  let fixture: ComponentFixture<BudgetVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetVendorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
