import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, } from 'rxjs';
import { CONSTANTS } from 'src/app/shared/enums/constants';
import { environment } from 'src/environments/environment';
import { Codelist, CodelistItem } from '../models/codelists';


@Injectable({
  providedIn: 'root'
})
export class CodeListService {

  private codelitUrl = `${environment.apiUrl}/codelists`;


  public codeListName$: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    this.codeListName$ = new BehaviorSubject('');
   }

  addCodeList(codeListItem: Codelist): Observable<Codelist> {
    return this.http.post<Codelist>(this.codelitUrl, codeListItem)
  }

  addorUpdateCodeListItem(codeListItem: CodelistItem): Observable<CodelistItem> {
    return this.http.post<CodelistItem>(`${this.codelitUrl}/item`, codeListItem)
  }
  getCodeLists(): Observable<Codelist[]> {
    return this.http.get<Codelist[]>(`${this.codelitUrl}`)
  }

  getCodeListItem(codeList: string): Observable<CodelistItem[]> {
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${codeList}/items`)
  }

  getOnlyActiveCodeListItems(codeList: string): Observable<CodelistItem[]> {
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${codeList}/items/activeonly`)
  }
  getActiveCodeLists(): Observable<Codelist[]> {
    return this.http.get<Codelist[]>(`${this.codelitUrl}/activeonly`)
  }

  getPlanCategory():Observable<CodelistItem[]>{
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${CONSTANTS.CODELISTS.PLANCATEGORY}/items`)
  };
  getAddressType():Observable<CodelistItem[]>{
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${CONSTANTS.CODELISTS.ADDRESSTYPE}/items`)
  };
  getPlanType():Observable<CodelistItem[]>{
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${CONSTANTS.CODELISTS.PLANTYPE}/items`)
  };
  getProductCategory():Observable<CodelistItem[]>{
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${CONSTANTS.CODELISTS.PRODUCTCATEGORY}/items`)
  };
  getProductType():Observable<CodelistItem[]>{
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${CONSTANTS.CODELISTS.PRODUCTTYPE}/items`)
  };
  getUserType():Observable<CodelistItem[]>{
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${CONSTANTS.CODELISTS.USERTYPE}/items`)
  };
  getSearchByUser():Observable<CodelistItem[]>{
    return this.http.get<CodelistItem[]>(`${this.codelitUrl}/${CONSTANTS.CODELISTS.SEARCHBYUSER}/items`)
  };


}
