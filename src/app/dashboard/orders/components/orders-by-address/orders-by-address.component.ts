import { Component, OnInit } from '@angular/core';
import { groupBy } from 'src/app/shared/helpers';

@Component({
  selector: 'app-orders-by-address',
  templateUrl: './orders-by-address.component.html',
  styleUrls: ['./orders-by-address.component.scss']
})
export class OrdersByAddressComponent implements OnInit {
  title: string = 'Orders';
  address!: any;
  location: string = '';
  printTitle = new Date().getTime()
  groupeditems: { [key: string]: any[] } = {}
  displayedColumns: string[] = ['name', 'mob-number', 'food-item', 'quantity', 'plan', 'delivery-slot', 'address'];
  constructor() { }

  ngOnInit(): void {
    this.groupeditems[''] = this.totalOrders;
  }
  groupOrders(key: string) {
    this.groupeditems = groupBy(this.totalOrders, key);
  }

  totalOrders = [
    { name: 'Scot', phone: '+923698521', foodItem: ['Biryani', 'Pulao'], quantity: 3, location: 'Faisal Town', planType: 'Executive', deliverySlot: '12:00-1:00' },
    { name: 'James', phone: '+923698521', foodItem: ['Steaks', 'Mutton'], quantity: 2, location: 'Muslim Town', planType: 'Low Cal', deliverySlot: '12:00-1:00' },
    { name: 'Ali', phone: '+923698521', foodItem: ['Daal', 'Roti'], quantity: 4, location: 'Wapda Town', planType: 'Classic', deliverySlot: '12:00-1:00' },
    { name: 'Hashir', phone: '+923698521', foodItem: ['Chawal', 'Curry'], quantity: 2, location: 'Garden Town', planType: 'Low Cal', deliverySlot: '12:00-1:00' },
    { name: 'Abdullah', phone: '+923698521', foodItem: ['Daal', 'Mash'], quantity: 1, location: 'Johar Town', planType: 'Classic', deliverySlot: '12:00-1:00' },
    { name: 'Salah', phone: '+923698521', foodItem: ['Chappal', 'Kebab'], quantity: 5, location: 'TownShip', planType: 'Executive', deliverySlot: '1:00-1:30' },
    { name: 'Messi', phone: '+923698521', foodItem: ['Qorma', 'Halwa'], quantity: 4, location: 'Faisal Town', planType: 'Low Cal', deliverySlot: '1:00-1:30' },
    { name: 'Hazard', phone: '+923698521', foodItem: ['Bhindi', 'Tori'], quantity: 7, location: 'Iqbal Town', planType: 'Classic', deliverySlot: '1:00-1:30' },
    { name: 'Nadal', phone: '+923698521', foodItem: ['Biryani', 'Pulao'], quantity: 4, location: 'Faisal Town', planType: 'Classic', deliverySlot: '1:00-1:30' },
    { name: 'Perrera', phone: '+923698521', foodItem: ['Biryani', 'Pulao'], quantity: 1, location: 'Johar Town', planType: 'Executive', deliverySlot: '1:00-1:30' },
    { name: 'Afridi', phone: '+923698521', foodItem: ['Karahi', 'Chawal'], quantity: 5, location: 'Muslim Town', planType: 'Classic', deliverySlot: '1:00-1:30' },
    { name: 'Scot', phone: '+923698521', foodItem: ['Biryani', 'Pulao'], quantity: 8, location: 'Faisal Town', planType: 'Executive', deliverySlot: '1:00-1:30' },
    { name: 'James', phone: '+923698521', foodItem: ['Steaks', 'Mutton'], quantity: 2, location: 'Muslim Town', planType: 'Low Cal', deliverySlot: '1:30-2:00' },
    { name: 'Ali', phone: '+923698521', foodItem: ['Daal', 'Roti'], quantity: 3, location: 'Wapda Town', planType: 'Classic', deliverySlot: '1:30-2:00' },
    { name: 'Hashir', phone: '+923698521', foodItem: ['Chawal', 'Curry'], quantity: 1, location: 'Garden Town', planType: 'Low Cal', deliverySlot: '1:30-2:00' },
    { name: 'Abdullah', phone: '+923698521', foodItem: ['Daal', 'Mash'], quantity: 4, location: 'Johar Town', planType: 'Classic', deliverySlot: '1:30-2:00' },
    { name: 'Salah', phone: '+923698521', foodItem: ['Chappal', 'Kebab'], quantity: 9, location: 'TownShip', planType: 'Executive', deliverySlot: '1:30-2:00' },
    { name: 'Messi', phone: '+923698521', foodItem: ['Qorma', 'Halwa'], quantity: 1, location: 'Faisal Town', planType: 'Low Cal', deliverySlot: '1:30-2:00' },
    { name: 'Hazard', phone: '+923698521', foodItem: ['Bhindi', 'Tori'], quantity: 2, location: 'Iqbal Town', planType: 'Classic', deliverySlot: '2:00-2:30' },
    { name: 'Nadal', phone: '+923698521', foodItem: ['Biryani', 'Pulao'], quantity: 1, location: 'Faisal Town', planType: 'Classic', deliverySlot: '2:00-2:30' },
    { name: 'Perrera', phone: '+923698521', foodItem: ['Biryani', 'Pulao'], quantity: 5, location: 'Johar Town', planType: 'Executive', deliverySlot: '2:00-2:30' },
    { name: 'Afridi', phone: '+923698521', foodItem: ['Karahi', 'Chawal'], quantity: 1, location: 'Muslim Town', planType: 'Classic', deliverySlot: '2:00-2:30' },
  ]
}
