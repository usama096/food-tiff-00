import { FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Product } from '../../models/products';
import { deleteProduct, getProducts } from '../../state/product.action';
import { ProductState } from '../../state/product.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  title = "Products List"
  imageWidth = 50;
  imageMargin = 2;
  search = new FormControl();
  errorMessage!: string
  products!: Product;
  prodState!: ProductState;
  prodStateSub!: Subscription;
  displayedColumns: string[] = ['id', 'name', 'description', 'image', 'action'];
  dataSource: Product[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    public shared: SharedService,
    private store: Store,
  ) {
    this.store.dispatch(getProducts());
    this.prodStateSub = this.store.select((state: any) => state.product).subscribe(
      (res) => {
        if (!res) {
          return;
        }
        this.prodState = res;
        this.dataSource = res.products;
      }
    )

  }
  addProduct(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.prodStateSub.unsubscribe();
  }

  deleteProduct(product: Product): void {
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
        this.store.dispatch(getProducts());

      }
    });
  }
}
