import { Component, OnInit } from '@angular/core';
import { Products } from './models/products';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor() { }
  

  ngOnInit(): void {
  }

}
