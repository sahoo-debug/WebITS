import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Item} from '../Models/item';
@Injectable({
  providedIn: 'root'
})
export class StepItemService {
  private baseUrl:string="https://localhost:44352/api/";
  private headers = { 'content-type': 'application/json'};
  constructor(private http:HttpClient) { }

  


  getItems(stepid:number):Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl + "item/getallitems/"+ stepid);
 }

 getItem(itemId:number):Observable<Item> {
  return this.http.get<Item>(this.baseUrl + "item/getitem/"+ itemId);
 }

 saveItem(item:Item):Observable<any>
 {
    if(item.itemId > 0)
    {
      return this.http.post<any>(this.baseUrl + "item/updateitem",item,{'headers':this.headers});
    }
    else{
      return this.http.post<any>(this.baseUrl + "item/additem",item,{'headers':this.headers});
    }   
 }

 removeItem(itemId:number):Observable<any>
 {
    return this.http.delete<any>(this.baseUrl + "item/removeitem/"+ itemId);
 }

  getSteps(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "step/getallsteps");
  }

 saveStep():Observable<any[]>
 {
    return this.http.post<any[]>(this.baseUrl + "step/addstep",null,{'headers':this.headers});
 }

 removeStep(stepId:number):Observable<any[]>
 {
    return this.http.delete<any[]>(this.baseUrl + "step/removestep/"+ stepId,{'headers':this.headers});
 }
}
