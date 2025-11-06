import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetChartComponent } from './budget-chart.component';

describe('BudgetChartComponent', () => {
  let component: BudgetChartComponent;
  let fixture: ComponentFixture<BudgetChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
