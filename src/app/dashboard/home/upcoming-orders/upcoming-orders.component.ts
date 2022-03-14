import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
export interface Adon {
  name: string,
  price: number,
  quantity: number
}

const adonData: Adon[] = [
  { name: 'Cold Drink', quantity: 1, price: 110 },
  { name: 'Desert', quantity: 1, price: 200 },
  { name: 'Snacks', quantity: 1, price: 150 },
]
@Component({
  selector: 'app-upcoming-orders',
  templateUrl: './upcoming-orders.component.html',
  styleUrls: ['./upcoming-orders.component.scss']
})
export class UpcomingOrdersComponent implements OnInit {
  minDate: Date = new Date()
  displayedColumns: string[] = ['name', 'quantity', 'price'];
  dataSource = adonData;
  dateCtrl = new FormControl(new Date())
  orders: any[] = []
  constructor() { }

  ngOnInit(): void {
    this.orders = this.upcomingBreakFastOrders;
  }

  matTabChanged(event: MatTabChangeEvent): void {
    switch (event.index) {
      case 0:
        this.orders = this.upcomingBreakFastOrders;
        break;
      case 1:
        this.orders = this.upcomingLunchOrders;
        break;
      case 2:
        this.orders = this.upcomingDinnerOrders;
        break;
    }
  }
  upcomingBreakFastOrders = [
    { meal1: 'Daal', image1: 'assets/images/daal.png', image2: 'assets/images/mix-sabzi.png', ordersforMeal1: 25, meal2: 'Mix Sabzi', ordersforMeal2: 30, category: 'Executive' },
    { meal1: 'Chicken', image1: 'assets/images/daal.png', image2: 'assets/images/mix-sabzi.png', ordersforMeal1: 35, meal2: 'Biryani', ordersforMeal2: 90, category: 'Economy' },
    { meal1: 'Chinies', image1: 'assets/images/daal.png', image2: 'assets/images/mix-sabzi.png', ordersforMeal1: 15, meal2: 'Pulao', ordersforMeal2: 50, category: 'Low Cal' }
  ];
  upcomingLunchOrders = [
    { meal1: 'Burger', image1: 'assets/images/daal.png', image2: 'assets/images/daal.png', ordersforMeal1: 28, meal2: 'Cake', ordersforMeal2: 30, category: 'Executive' },
    { meal1: 'Soup', image1: 'assets/images/daal.png', image2: 'assets/images/daal.png', ordersforMeal1: 35, meal2: 'Chinies', ordersforMeal2: 90, category: 'Economy' },
    { meal1: 'Chinies', image1: 'assets/images/daal.png', image2: 'assets/images/mix-sabzi.png', ordersforMeal1: 15, meal2: 'Pulao', ordersforMeal2: 50, category: 'Low Cal' }
  ];
  upcomingDinnerOrders = [
    { meal1: 'Biryani', image1: 'assets/images/daal.png', image2: 'assets/images/mix-sabzi.png', ordersforMeal1: 25, meal2: 'Alu Palak', ordersforMeal2: 30, category: 'Executive' },
    { meal1: 'Chicken', image1: 'assets/images/daal.png', image2: 'assets/images/mix-sabzi.png', ordersforMeal1: 35, meal2: 'Biryani', ordersforMeal2: 90, category: 'Economy' },
    { meal1: 'Burger', image1: 'assets/images/daal.png', image2: 'assets/images/mix-sabzi.png', ordersforMeal1: 15, meal2: 'Pizza', ordersforMeal2: 50, category: 'Low Cal' }
  ];

}
