"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MealPlannerComponent = void 0;
var environment_1 = require("../environments/environment");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var enums_1 = require("src/app/shared/enums/enums");
var MealPlannerComponent = /** @class */ (function () {
    function MealPlannerComponent(planService, refDataService, fb, route, store, toaster) {
        this.planService = planService;
        this.refDataService = refDataService;
        this.fb = fb;
        this.route = route;
        this.store = store;
        this.toaster = toaster;
        this.onDataSelected = new core_1.EventEmitter();
        this.imageWidth = 30;
        this.imageMargin = 2;
        this.isPublished = false;
        this.displayedColumns = ['servingDate'];
        this.filteredMeals = [];
        this.dates = [];
        this.mealCount = 0;
        this.dailyMeals = [];
        this.meals = [];
        this.mealName = '';
        this.productId = 0;
        this.mealForm = this.fb.group({
            isPublished: true,
            mealFilter: [''],
            planProductsArr: this.fb.array([])
        });
    }
    Object.defineProperty(MealPlannerComponent.prototype, "planProductsArr", {
        get: function () {
            return this.mealForm.get("planProductsArr");
        },
        enumerable: false,
        configurable: true
    });
    MealPlannerComponent.prototype._loadMealsByType = function (mealType) {
        if (this.mealtype == enums_1.MealType.BreakFast) {
            this.mealCount = environment_1.environment.breakfast_meal_count;
        }
        else if (this.mealtype == enums_1.MealType.Lunch) {
            this.mealCount = environment_1.environment.lunch_meal_count;
        }
        else if (this.mealtype == enums_1.MealType.Dinner) {
            this.mealCount = environment_1.environment.dinner_meal_count;
        }
        else if (this.mealtype == enums_1.MealType.Supper) {
            this.mealCount = environment_1.environment.supper_meal_count;
        }
        for (var i = 1; i <= this.mealCount; i++) {
            var col = "Meal " + i;
            this.dailyMeals.push(col);
            this.displayedColumns.push(col);
        }
        ;
        this.displayedColumns.push('publish');
        this.displayedColumns.push('save');
    };
    MealPlannerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.refDataService.availableProducts().subscribe(function (res) {
            _this.meals = res;
        });
        this.store.select(function (state) { return state.plan; }).subscribe(function (res) {
            if (!res) {
                return;
            }
            return res;
        });
        this._loadMealsByType(this.mealtype);
        this.mealForm.controls["mealFilter"].valueChanges.subscribe(function (val) {
            _this.filteredMeals = _this.meals.filter(function (meal) { return meal.name.toLowerCase().indexOf(val) !== -1; });
        });
        this.filteredMeals = this.meals;
        this.onDateSelected();
    };
    ;
    MealPlannerComponent.prototype.onDateSelected = function () {
        var _this = this;
        var dates = [];
        var planProductsData = this.planProduct;
        var id = +this.route.snapshot.paramMap.get('id');
        var fg;
        if (this.startDate && this.endDate) {
            dates = this.getDates();
        }
        dates.map(function (date) {
            var _a, _b;
            var servingDate = date.toISOString();
            if ((id | _this.newPlanId) && planProductsData) {
                var filterDataByServingDate = planProductsData.filter(function (planProductsData) {
                    return planProductsData.servingDate == date.toISOString();
                });
                fg = new forms_1.FormGroup({
                    planId: new forms_1.FormControl(id !== null && id !== void 0 ? id : _this.newPlanId, forms_1.Validators.required),
                    meals: new forms_1.FormArray([]),
                    servingDate: new forms_1.FormControl(servingDate),
                    isPublished: new forms_1.FormControl((_b = (_a = filterDataByServingDate[0]) === null || _a === void 0 ? void 0 : _a.isPublished) !== null && _b !== void 0 ? _b : false, forms_1.Validators.required)
                });
                var mealFormArray_1 = fg.get('meals');
                _this.dailyMeals.forEach(function (meal, i) {
                    var mealfg = new forms_1.FormGroup({
                        id: new forms_1.FormControl(0, forms_1.Validators.required),
                        productId: new forms_1.FormControl(null, forms_1.Validators.required),
                        name: new forms_1.FormControl(null, forms_1.Validators.required)
                    });
                    mealFormArray_1.push(mealfg);
                });
                _this.planProductsArr.push(fg);
                filterDataByServingDate.forEach(function (obj, i) {
                    var _a;
                    var mfg = mealFormArray_1.controls[i];
                    mfg.setValue({
                        id: obj.id,
                        productId: obj.productId,
                        name: (_a = obj.product) === null || _a === void 0 ? void 0 : _a.name
                    });
                });
            }
            // else {
            //   fg = new FormGroup({
            //     planId: new FormControl(0, Validators.required),
            //     meals: new FormArray([]),
            //     servingDate: new FormControl(servingDate, Validators.required),
            //     isPublished: new FormControl(false, Validators.required)
            //   });
            //   const mealFormArray = fg.get('meals') as FormArray;
            //   this.dailyMeals.forEach((meal: any, i) => {
            //     let mealfg = new FormGroup({
            //       id: new FormControl(0, Validators.required),
            //       productId: new FormControl(),
            //     })
            //     mealFormArray.push(mealfg);
            //   })
            //   this.planProductsArr.push(fg);
            // }
        });
        // this.sendDataToParent();
    };
    MealPlannerComponent.prototype.onProductChange = function (event, product, i) {
        this.productId = event.value;
        console.log(product);
        var data = product.controls['meals'];
        data.controls[0].get('name');
    };
    // sendDataToParent() {
    //   this.onDataSelected.emit(this.planProductsArr.value);
    // }
    MealPlannerComponent.prototype.getDates = function () {
        var start = new Date(this.startDate);
        var end = new Date(this.endDate);
        var diffTime = Math.abs(+end - +start);
        var days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        var dates = [];
        for (var i = 0; i <= days; i++) {
            if (start.getTime() <= end.getTime()) {
                dates.push(new Date(start));
                start.setDate(start.getDate() + 1);
            }
        }
        return dates;
    };
    ;
    MealPlannerComponent.prototype.savePlanProducts = function (data) {
        var _this = this;
        var _a;
        var meals = (_a = data.get("meals")) === null || _a === void 0 ? void 0 : _a.value;
        var id = +this.route.snapshot.paramMap.get('id');
        this.planProductsTobeSent = [];
        var meal;
        meals.forEach(function (m) {
            var _a, _b;
            meal = {
                id: m.id,
                planId: id ? id : _this.newPlanId,
                productId: m.productId,
                servingDate: (_a = data.get("servingDate")) === null || _a === void 0 ? void 0 : _a.value,
                isPublished: (_b = data.get("isPublished")) === null || _b === void 0 ? void 0 : _b.value
            };
            if (meal['productId']) {
                _this.planProductsTobeSent.push(meal);
            }
        });
        if (this.planProductsTobeSent.length === meals.length) {
            console.log('Plan Products: ', this.planProductsTobeSent);
            this.planService.createPlanProducts({ planProducts: this.planProductsTobeSent }).subscribe(function (res) {
                if (res) {
                    _this.toaster.success('Products updated successfully', 'Success');
                }
            });
        }
        else {
            this.toaster.error("Please select all meals against a particulat date!", "Error!");
        }
    };
    __decorate([
        core_1.Input('start')
    ], MealPlannerComponent.prototype, "startDate");
    __decorate([
        core_1.Input('end')
    ], MealPlannerComponent.prototype, "endDate");
    __decorate([
        core_1.Input('mealtype')
    ], MealPlannerComponent.prototype, "mealtype");
    __decorate([
        core_1.Input('newlyCreatedPlanId')
    ], MealPlannerComponent.prototype, "newPlanId");
    __decorate([
        core_1.Output()
    ], MealPlannerComponent.prototype, "onDataSelected");
    __decorate([
        core_1.Input()
    ], MealPlannerComponent.prototype, "planProduct");
    MealPlannerComponent = __decorate([
        core_1.Component({
            selector: 'app-meal-planner',
            templateUrl: './meal-planner.component.html',
            styleUrls: ['./meal-planner.component.scss']
        })
    ], MealPlannerComponent);
    return MealPlannerComponent;
}());
exports.MealPlannerComponent = MealPlannerComponent;
