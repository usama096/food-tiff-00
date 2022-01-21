import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersByAddressComponent } from './orders-by-address.component';

describe('OrdersByAddressComponent', () => {
  let component: OrdersByAddressComponent;
  let fixture: ComponentFixture<OrdersByAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersByAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersByAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
