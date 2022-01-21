import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { ProductsResolved, Products } from '../../models/products';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit {
  pageTitle = 'Product Details';
  products!: Products;
  imageWidth = 150;
  imageMargin = 2;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private spinner: SpinnerService
  ) {

  }

  ngOnInit(): void {

    this.route.data.subscribe((data) => {
      // this.spinner.spinner()
      console.log(data);
      const resolvedData: ProductsResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onProductRetrieved(resolvedData.products!);
    });
  }

  onProductRetrieved(product: Products): void {
    this.products = product;
    if (this.products) {
      this.pageTitle = `Product Details: ${this.products.name}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

  deleteProduct(): void {
    if (!this.products.id) {
      console.log(`${this.products.name} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.products.name}?`)) {
        this.productsService.deleteProduct(this.products.id).subscribe({
          next: () => console.log(`${this.products.name} was deleted`),
          error: (err) => (this.errorMessage = err),
        });
      }
    }
    this.router.navigate(['../../products'], { relativeTo: this.route });
  }
}
