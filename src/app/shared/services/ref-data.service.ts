import { CONSTANTS } from 'src/app/shared/enums/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../../dashboard/products/models/products';
import { Codelist, CodelistItem } from '../models/codelists-model';
@Injectable({
  providedIn: 'root'
})
export class RefDataService {
  private codelitUrl = `${environment.apiUrl}/codelists`;
  private prodUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getCodeLists(): Observable<Codelist[]> {
    return this.http.get<Codelist[]>(`${this.codelitUrl}`)
  }

  getCodeListItem(codeList: string): Observable<CodelistItem[]> {
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${codeList}/items`)
  }
  getPlanCategory(): Observable<CodelistItem[]> {
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${CONSTANTS.CODELISTS.PLANCATEGORY}/items`)
  };

  getAddressType(): Observable<CodelistItem[]> {
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${CONSTANTS.CODELISTS.ADDRESSTYPE}/items`)
  };
  getPlanType(): Observable<CodelistItem[]> {
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${CONSTANTS.CODELISTS.PLANTYPE}/items`)
  };

  getProductCategory(): Observable<CodelistItem[]> {
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${CONSTANTS.CODELISTS.PRODUCTCATEGORY}/items`)
  };
  getProductType(): Observable<CodelistItem[]> {
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${CONSTANTS.CODELISTS.PRODUCTTYPE}/items`)
  };
  getUserType(): Observable<CodelistItem[]> {
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${CONSTANTS.CODELISTS.USERTYPE}/items`)
  };

  getOnlyActiveCodeListItems(codeList: string): Observable<CodelistItem[]> {
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${codeList}/items/activeonly`)
  }
  availableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.prodUrl}/products/available`)
  }
  getActiveCodeLists(): Observable<Codelist[]> {
    return this.http.get<Codelist[]>(`${this.codelitUrl}/activeonly`)
  }

}
