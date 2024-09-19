import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetVendorsSubComponent } from './budget-vendors-sub.component';

describe('BudgetVendorsSubComponent', () => {
  let component: BudgetVendorsSubComponent;
  let fixture: ComponentFixture<BudgetVendorsSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetVendorsSubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetVendorsSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
