import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSubComponent } from './schedule-sub.component';

describe('ScheduleSubComponent', () => {
  let component: ScheduleSubComponent;
  let fixture: ComponentFixture<ScheduleSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleSubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
