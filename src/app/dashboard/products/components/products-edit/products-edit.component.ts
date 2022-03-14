import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductResolved } from '../../models/products';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { addProduct, updateProduct } from '../../state/product.action';
import { ProductState } from '../../state/product.reducer';
import { CodelistItem } from 'src/app/shared/models/codelists-model';
import { RefDataService } from 'src/app/shared/services/ref-data.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss'],
})
export class ProductsEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Add New Product';
  productsForm!: FormGroup;
  products!: Product;
  errorMessage!: string;
  productId!: number;
  selectable = true;
  removable = true;
  addOnBlur = true;
  ingrediants: string[] = [];
  isReadOnlyMode: boolean = false;
  isUpdateMode: boolean = false;
  fileName!: string;
  category: CodelistItem[] = [];
  productType: CodelistItem[] = [];
  productState!: ProductState;
  prodStateSub!: Subscription;
  imageSrc!: string | null | undefined;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private refDataService: RefDataService,
    private fileUploadService: FileUploadService,
    private store: Store,
  ) {
    this.productsForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [null, [Validators.required]],
      shortDescription: ['', [Validators.required]],
      imageId: [],
      prodType: ['', [Validators.required]],
      category: ['', [Validators.required]],
      ingredients: [[], [Validators.required]],
      allergyInfo: ['', [Validators.required]],
      calories: [null, [Validators.required]],
      isAvailable: [true]
    });
  }
  ngOnInit(): void {
    this.prodStateSub = this.store.select((state: any) => state.product).subscribe(
      (res) => {
        if (!res) {
          return;
        }
        this.productState = res;
        if (res.addSuccess) {
          this.toaster.success('Product addedd successfully!','Success')
          this.router.navigate(['dashboard/products'])
        }
        if (res.updateSuccess) {
          this.toaster.success('Product updated successfully!','Success')
          this.router.navigate(['dashboard/products'])
        }
      }
    )
    this.refDataService.getProductCategory().subscribe((res) => {
      this.category = res;
    });
    this.refDataService.getProductType().subscribe((res) => {
      this.productType = res;
    })
    this.route.data.subscribe((data) => {
      const resolvedData: ProductResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      if (resolvedData.products) this.onProductRetrieved(resolvedData.products);
    });

  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.productsForm.get('ingredients')?.value.push(value);
    }
    event.chipInput!.clear();
  }

  remove(ingrediant: string): void {
    const index = this.productsForm
      .get('ingredients')
      ?.value.indexOf(ingrediant);
    if (index > -1) {
      this.productsForm.get('ingredients')?.value.splice(index, 1);
    }
  }

  onFileUpload(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append('file', file, file.name);

        this.fileUploadService.uploadFile(formData).subscribe((res) => {
          this.imageSrc = res.downloadUrl;
          this.productsForm.get('imageId')?.setValue(res.id)
        })
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
  ngOnDestroy(): void {
    this.prodStateSub.unsubscribe();
  }
  onProductRetrieved(product: Product): void {
    this.products = product;
    this.imageSrc = product.image?.downloadUrl;
    this.ingrediants = product.ingredients.split(',');
    const id = this.route.snapshot.paramMap.get('id');

    this.productsForm.patchValue({
      ...product,
      ingredients: this.ingrediants,
    });

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
      this.productsForm.get('prodType')?.disable();
    }
    if (url === `/dashboard/products/${id}/edit`) {
      this.isUpdateMode = true;
    }
  }

  updateProduct(): void {
    let id = +this.route.snapshot.paramMap.get('id')!;
    let ingrediants = this.productsForm.get('ingredients')?.value.toString();
    let product = { ...this.productsForm.value, ingredients: ingrediants }

    if (!id) {
      this.store.dispatch(addProduct({ product }))

    } else {
      this.store.dispatch(updateProduct({ product, id }));
    }
  }
}
