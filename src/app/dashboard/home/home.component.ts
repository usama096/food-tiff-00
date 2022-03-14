import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  total_Price: number = 0;
  saleData = [
    { name: "Platinum", value: 1500 },
    { name: "Executive", value: 800 },
    { name: "Gold", value: 1080 },
    { name: "Silver", value: 1200 },
    { name: "Keto Diet", value: 1300 },

  ];
  days = new FormControl('Today');

  orders = [
    { orderName: "1 x Kimchi Burger", price: 20 },
    { orderName: "1 x Big bunny Burger", price: 25 },
    { orderName: "1 x Fruit Salad", price: 10 }
  ];
  totalPrice(): void {
    for (let i = 0; i < this.orders.length; i++) {
      this.total_Price += this.orders[i].price
    }
  };
  dishes = [
    { name: 'Top-end filet mingon', description: 'Easy Grilled Mengon', image: 'assets/images/daal.png', price: '50' },
    { name: 'Top-end filet chicken', description: 'Easy Grilled Mengon', image: 'assets/images/daal.png', price: '60' },
    { name: 'Top-end filet Pizza', description: 'Easy Baked Pizza', image: 'assets/images/daal.png', price: '70' }
  ];
  employees = [
    { name: 'Anderson Silva', designation: 'Manager', image: 'assets/images/daal.png', time: '6pm-8pm' },
    { name: 'King Salman', designation: 'Cook', image: 'assets/images/daal.png', time: '10pm-12pm' },
    { name: 'Donald Trump', designation: 'Waiter', image: 'assets/images/daal.png', time: '3pm-5pm' },
  ];
  upcomingOrders = [
    { customerName: 'Bruce Williams + 3', time: '11:00' },
    { customerName: 'Jesica Smith + 2' },
    { customerName: 'Harold', time: '12:00' },
    { customerName: 'Harold Nelson + 1', time: '14:00' },
    { customerName: 'Marie + 2', time: '12:0' },
    { customerName: 'Britney Cooper + 3', time: '15:00' },
    { customerName: 'Oscar + 1' },
    { customerName: 'Christopher Gibson + 3', time: '16:00' },
    { customerName: 'Loren Spears + 1' },
    { customerName: 'Ali + 2', time: '17:00' },
    { customerName: 'Harold Nelson + 1', time: '18:00' },

  ];
  constructor() { }
  ngOnInit(): void {
    this.totalPrice();
  }
}
