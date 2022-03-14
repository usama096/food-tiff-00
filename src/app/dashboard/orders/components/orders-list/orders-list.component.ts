import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],

})
export class OrdersListComponent implements OnInit {
  minDate: Date = new Date();
  dateCtrl = new FormControl(new Date());
  orders: any[] = [];
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: SpinnerService) {

  }

  ngOnInit(): void {
    // this.spinner.spinner()
    this.router.navigate(['151'], { relativeTo: this.activatedRoute });
    this.orders = this.economyOrders;
  }
  tabChanged(event: MatTabChangeEvent): void {
    switch (event.index) {
      case 0:
        this.orders = this.economyOrders
        break;
      case 1:
        this.orders = this.executiveOrders
        break;
      case 2:
        this.orders = this.lowCalOrders
        break;
    }
  }
  breakFastOrders(): void {
    console.log("List of BreakFast Orders")
  }
  lunchOrders(): void {
    console.log("List of Lunch Orders")

  }
  dinnerOrders(): void {
    console.log('List of Dinner Orders')
  }
  economyOrders = [
    { id: 1, orderId: 151, timing: 'As soon as', price: 100 },
    { id: 2, orderId: 152, timing: 'As soon as', price: 150 },
    { id: 3, orderId: 153, timing: 'As soon as', price: 200 },
    { id: 4, orderId: 154, timing: 'As soon as', price: 300 },
  ];
  executiveOrders = [
    { id: 1, orderId: 161, timing: 'As soon as', price: 150 },
    { id: 2, orderId: 162, timing: 'As soon as', price: 200 },
    { id: 3, orderId: 163, timing: 'As soon as', price: 250 },
    { id: 4, orderId: 164, timing: 'As soon as', price: 350 },
  ];
  lowCalOrders = [
    { id: 1, orderId: 181, timing: 'Arrived', price: 100 },
    { id: 2, orderId: 182, timing: 'on the way', price: 120 },
    { id: 3, orderId: 183, timing: 'As soon as', price: 140 },
    { id: 4, orderId: 184, timing: 'not coming', price: 160 },
  ];
}
