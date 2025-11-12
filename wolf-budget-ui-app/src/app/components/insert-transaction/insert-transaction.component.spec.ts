import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTransactionComponent } from './insert-transaction.component';

describe('InsertTransactionComponent', () => {
  let component: InsertTransactionComponent;
  let fixture: ComponentFixture<InsertTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
