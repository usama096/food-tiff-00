import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { Products } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import { deleteProduct, getProducts } from '../../state/product.action';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  title = "Products List"
  imageWidth = 50;
  imageMargin = 2;
  search = new FormControl();
  errorMessage!: string
  products!: Products;
  displayedColumns: string[] = ['id', 'name', 'description', 'image', 'action'];
  dataSource: Products[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private spinner: SpinnerService,
    public shared: SharedService,
    private store: Store,
  ) {
    this.store.dispatch(getProducts());
    this.store.select((state: any) => state.product).subscribe(
       (res) => {
        console.log(res)
        if(res.products){
          return this.dataSource = res.products;
        }
        if(res.error) {
          console.log('error is: ',res.error)
          return res.error
        }
      }
    )

    // this.spinner.spinnerShow()
    // this.dataSource = this.productsService.getProducts();
    // this.productsService.getProducts().subscribe((data: any) => {
    //   this.dataSource = data;
    // })

  }
  addProduct(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  ngOnInit(): void {
  }
  deleteProduct(product: Products): void {
    let data = {
      value: product.name,
      title: 'Delete',
      button: 'Delete',
      description: 'Do you realy want to Delete',
      id: product.id
    }
    this.shared.confirmItem(data).afterClosed().subscribe((res: any) => {
      const id = data.id
      if (res === true) {
        this.store.dispatch(deleteProduct({ id }));
        this.store.select((state: any) => state.product.response).subscribe(
          (resp) => {
            this.store.dispatch(getProducts());
          }
        )
      }
      // console.log("Response from confirmation Component is: ", res)
      // if(res === true) {
      //   this.productsService.deleteProduct(+product.id!).subscribe({
      //     next: () => {
      //       this.productsService.getProducts().subscribe((data: any) => {
      //         this.dataSource = data
      //       })
      //     },
      //     error: err => console.log(err)

      //   });
      // }
    });
  }
}
