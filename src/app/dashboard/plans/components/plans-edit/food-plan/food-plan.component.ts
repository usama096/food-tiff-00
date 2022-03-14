import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-food-plan',
  templateUrl: './food-plan.component.html',
  styleUrls: ['./food-plan.component.scss']
})
export class FoodPlanComponent implements OnInit {

  @Input() formGroup!: FormGroup
  @Input() planCategories!: any[];
  @Input() plansList!: any[];
  @Input() imageSrc!: string | null | undefined;

  @Output('onFileUpload') onFileUpload: EventEmitter<string> = new EventEmitter();

  constructor() { }
  onUpload(event: any) {
    console.log('event: ',event)
    this.onFileUpload.emit(event)
  }
  ngOnInit() {
  }

}
