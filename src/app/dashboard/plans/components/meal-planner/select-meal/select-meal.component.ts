import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Product } from 'src/app/dashboard/products/models/products';

@Component({
  selector: 'app-select-meal',
  templateUrl: './select-meal.component.html',
  styleUrls: ['./select-meal.component.scss']
})
export class SelectMealComponent implements OnInit {
  @Output() mealChage = new EventEmitter<any>();
  @Input() formCtrl = new FormControl
  @Input() meals: Product[] = []
  imageWidth = 30;
  imageMargin = 2;
  @Input() selectTriggerName!: string;
  @Input() mealName!: string;

  constructor() { }

  ngOnInit() {
  }
  onProductChange(e: MatSelectChange) {
    this.meals.find((ob) => {
      if (ob.id == e.value) {
        this.selectTriggerName = ob.name;
      }
    })
    this.mealChage.emit(e)
  }
}
