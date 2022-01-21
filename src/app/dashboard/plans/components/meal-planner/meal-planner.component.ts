import { environment } from './../../../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MealType } from 'src/app/shared/enums';
import { PlansService } from '../../services/plans.service';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.scss'],
})
export class MealPlannerComponent implements OnInit {
  @Input('start') startDate!: Date;
  @Input('end') endDate!: Date;
  @Input('mealtype') mealtype!: MealType;
  imageWidth = 30;
  imageMargin = 2;
  displayedColumns: string[] = ['date'];
  filteredMeals: any = [];
  mealFilterCtrl = new FormControl('');
  dates: any = [];
  mealCount: number = 0;
  dailyMeals: any[] = [];
  constructor(private planService: PlansService) { }

  private _loadMealsByType(mealType: MealType) {
    if (this.mealtype == MealType.BreakFast) {
      this.mealCount = environment.breakfast_meal_count;
    } else if (this.mealtype == MealType.Lunch) {
      this.mealCount = environment.lunch_meal_count;
    } else if (this.mealtype == MealType.Dinner) {
      this.mealCount = environment.dinner_meal_count;
    }

    for (let i = 1; i <= this.mealCount; i++) {
      const col = `Meal ${i}`;
      this.dailyMeals.push(col);
      this.displayedColumns.push(col);
    };
  }
  mealNames: any;
  ngOnInit(): void {
    this._loadMealsByType(this.mealtype);
    this.mealFilterCtrl.valueChanges.subscribe((val) => {
      this.filteredMeals = this.meals.filter(
        (meal) => meal.name.toLowerCase().indexOf(val) !== -1
      );
    });
    this.filteredMeals = this.meals;
    let dates: Date[] = [];
    if (this.startDate && this.endDate) {
      dates = this.getDates();
    }

    this.dates = dates.map((date) => {
      let d: any = { date: date };
      this.dailyMeals.forEach((m) => {
        d[m] = '';
      });
      return d;
    });
  };
  getDates(): Date[] {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const diffTime = Math.abs(+end - +start);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let dates: Date[] = [];
    for (let i = 0; i <= days; i++) {
      if (start.getTime() <= end.getTime()) {
        dates.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }
    }
    return dates;
  };
  meals = [
    {
      id: 1,
      name: 'Chicken',
      imageUrl: './assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 2,
      name: 'mutton',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 3,
      name: 'Byrant',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 4,
      name: 'Daal',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 5,
      name: 'Sabic',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 6,
      name: 'Biryani',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 7,
      name: 'Pulao',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 8,
      name: 'Daleem',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 9,
      name: 'Bhindi',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 10,
      name: 'Kareela',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 11,
      name: 'Fresh Juice',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
    {
      id: 12,
      name: 'Daal Mash',
      imageUrl: 'assets/images/chicken.png',
      description: 'Healthy and Hygenic',
    },
  ];
}
