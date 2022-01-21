import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
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
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss']
})
export class OrdersViewComponent implements OnInit {

  totalPrice: number = 0;
  discount = 10;
  subtotal = 0;
  panelOpenState: boolean = false;
  date: Date = new Date();
  displayedColumns: string[] = ['name', 'quantity', 'price'];
  dataSource = adonData;
  showOrderdetails: boolean = false;
  statusInfoGrp!: FormGroup
  message: boolean = false;
  ordernumber!: number;
  acceptOrders: boolean = false;
  rejectOrders: boolean = false;
  reasonforRejection: boolean = false;
  submitRejection: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private shared: SharedService
  ) {
    this.statusInfoGrp = this.fb.group({
      statusInfo: ['Approval Pending'],
      order: [],
      acceptOrder: [],
      reasonforRejection: [],
      orderAcceptanceNotes: [],
      rejectOrder: [],
      specificRejectionReason: []
    })
  }
  ngOnInit(): void {
    this.total_price()
    this.totalPrice = this.subtotal - (this.discount / 100) * this.subtotal;
    this.route.params.subscribe((res: any) => {
      if (res) { }
      this.ordernumber = res.id;
      this.statusInfoGrp.get('statusInfo')?.disable();
    });
  };
  orderDetails = ["Approval Pending", "Accepted", "Preparing", "Delivery Pending", "Out for delivery", "Delivered"];
  orderRejectionReason = ["Rejection 1", "Rejection 2", "Rejection 3", "Other"];
  orderAccepted = ['Acceptance 1', 'Acceptance 2', 'Acceptance 3']

  total_price() {
    for (let i = 0; i < this.orders.length; i++) {
      this.subtotal += this.orders[i].price
    }
  };

  orders = [
    { name: "Fruity Pancakes", price: 200, number_of_orders: 2, details: 'Drink', image: 'assets/images/bakery.png', adons: 'Drink, Snacks, Deserts' },
    { name: "Special Soup", price: 400, number_of_orders: 6, details: 'Desert', image: 'assets/images/soup.png', adons: 'Drink, Snacks, Deserts' },
    { name: "Chinies Rice", price: 300, number_of_orders: 7, details: 'Snacks', image: 'assets/images/chinies.png', adons: 'Drink, Snacks, Deserts' },
  ];

  acceptOrder() {
    this.acceptOrders = true;
    this.rejectOrders = !this.acceptOrders;
    this.statusInfoGrp.get('order')?.setValue('Accepted')
    this.statusInfoGrp.get('orderAcceptanceNotes')?.valueChanges
      .subscribe(val => {
        if (val) {
          this.showOrderdetails = true;
          this.statusInfoGrp.get('statusInfo')?.setValue('Accepted')
          this.orderDetails.filter((val) => {
            for (let i in this.orderDetails) {
              if (this.orderDetails[i] == 'Approval Pending') {
                this.orderDetails.splice(+i, 1);
                break;
              }
            }
          })
          this.statusInfoGrp.get('statusInfo')?.enable();
        }
      });
  };
  rejectOrder() {
    this.statusInfoGrp.get('acceptOrder')?.disable();
    this.rejectOrders = true;
    this.statusInfoGrp.get('order')?.setValue('Rejected')

    this.statusInfoGrp.get('specificRejectionReason')?.valueChanges.subscribe(val => {
      if (val === "Other") {
        this.reasonforRejection = true;
        this.submitRejection = true;
      }
      else {
        this.submitRejection = true;
      }
    })
  };

  updateOrder() {
    let data = {
      value: this.statusInfoGrp.get('order')?.value,
      title: 'Order',
      button: 'OK',
      description: 'Do you really want that order to be',
      color: 'warn'
    }
    this.shared.confirmItem(data).afterClosed().subscribe((res: any) => {
      console.log(res)
      if (res !== true) {
        this.statusInfoGrp.get('statusInfo')?.disable();
        this.statusInfoGrp.reset()
        return;
      }
      else {
        console.log('Form Value is: ', this.statusInfoGrp.value)
      }
    })

  };

  submitOrder() {
    console.log(this.statusInfoGrp.value)
  }

  submitOrderRejection() {
    let data = {
      value: this.statusInfoGrp.get('order')?.value,
      title: 'Order',
      button: 'OK',
      description: 'Do you really want that order to be'

    }
    this.rejectOrder();
    this.shared.confirmItem(data).afterClosed().subscribe((res: any) => {
      console.log(res)
      if(res !== true) {

      }
      if (res ===true) {
        this.message = true;
        this.rejectOrders = true;
        this.submitRejection = false;
        this.reasonforRejection = false;
      }
    })
  }

}
