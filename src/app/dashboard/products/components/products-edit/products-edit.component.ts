import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { Products, ProductsResolved } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { addProduct, updateProduct } from '../../state/product.action';
@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss'],
})
export class ProductsEditComponent implements OnInit {
  pageTitle = 'Add New Product';
  productsForm!: FormGroup;
  products!: Products;
  errorMessage!: string;
  productId!: number;
  selectable = true;
  removable = true;
  addOnBlur = true;
  ingrediants: string[] = [];
  isReadOnlyMode: boolean = false;
  isUpdateMode: boolean = false;
  fileName!: string;
  category = ['Desert', 'Drink', 'Snacks'];
  productType = ['Adon', 'Main'];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private spinner: SpinnerService,
    private router: Router,
    private store: Store,
  ) {
    this.productsForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      price: ['650', [Validators.required]],
      id: [],
      shortDesc: ['', [Validators.required]],
      productType: ['Create a new', [Validators.required]],
      category: ['', [Validators.required]],
      ingrediants: [[], [Validators.required]],
      allergyInfo: ['', [Validators.required]],
      calories: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    // this.spinner.spinner()

    this.route.data.subscribe((data) => {
      const resolvedData: ProductsResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      if (resolvedData.products) this.onProductRetrieved(resolvedData.products);
    });
  }
  // Chips for adding ingrediant//
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.productsForm.get('ingrediants')?.value.push(value);
    }
    event.chipInput!.clear();
  }

  remove(ingrediant: string): void {
    const index = this.productsForm
      .get('ingrediants')
      ?.value.indexOf(ingrediant);
    if (index > -1) {
      this.productsForm.get('ingrediants')?.value.splice(index, 1);
    }
  }
  // For Uploading Image
  onFileUpload(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append('file', file, file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.productsForm.get('image')?.setValue(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  hasError(controlName: string, validationType: string): boolean {
    const control = this.productsForm.controls[controlName];
    if (!control) return false;
    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  reset(): void {
    this.products = null!;
  }

  onProductRetrieved(product: Products): void {
    this.products = product;
    this.productsForm.patchValue({
      ...this.products,
      ingrediants: this.products.ingrediants ?? [],
    });
    this.ingrediants = this.products.ingrediants ?? [];
    const id = this.route.snapshot.paramMap.get('id');
    if (!this.products) {
      this.pageTitle = 'No Product Found';
    } else {
      if (!id) {
        this.pageTitle = 'Add New Product';
      } else {
        this.productId = +id!;
        this.pageTitle = `${this.products.name}`;
      }
    }
    const url = this.router.url;
    if (url === `/dashboard/products/${id}`) {
      this.isReadOnlyMode = true;
      this.productsForm.get('category')?.disable();
      this.productsForm.get('productType')?.disable();
    }
    if (url === `/dashboard/products/${id}/edit`) {
      this.isUpdateMode = true;
    }
  }

  updateProduct(): void {
    let product = { ...this.productsForm.value }
    let id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.store.dispatch(addProduct({ product }))
      this.store.select((state: any) => state.product.product).subscribe(
        (resp) => {
          this.products = resp;
          this.reset();
          this.router.navigate(['dashboard/products'])
        }
      )
    } else {
      this.store.dispatch(updateProduct({ product }));
      this.store.select((state: any) => state.product.product).subscribe(
        (resp) => {
          this.products = resp;
          this.reset();
          this.router.navigate(['dashboard/products'])
        }
      )
    }
    // this.products = { ...this.productsForm.value };
    // const id = this.route.snapshot.paramMap.get('id');
    // if (!id) {
    //   this.productsService.createProduct(this.products).subscribe({
    //     next: () => {
    //       this.reset();
    //       this.router.navigate(['../'], { relativeTo: this.route });
    //     },
    //     error: (err) => (this.errorMessage = err),
    //   });
    // } else {
    //   this.productsService.updateProduct(this.products).subscribe({
    //     next: () => {
    //       this.router.navigate(['../../'], { relativeTo: this.route });
    //     },
    //     error: (err) => (this.errorMessage = err),
    //   });
    // }
  }
}
