import { Injectable } from '@angular/core';
import {Food} from "../shared/models/food";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subscription, tap} from "rxjs";
import { FoodAdd } from "../shared/interfaces/FoodAdd";
import { FoodDelete } from "../shared/interfaces/foodDelete";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  baseURL = 'http://localhost:3300'

  private foodSubject = new BehaviorSubject<Food>(new Food);

  public foodObservable: Observable<Food>

  constructor(
    private httpClient: HttpClient
  ) {
    this.foodObservable = this.foodSubject.asObservable();
  }

  getAll(): Observable<Food[]> {
    return this.httpClient.get<Food[]>(this.baseURL + '/food');
  }

  addFood(foodAdd: FoodAdd): Observable<Food>{
    return this.httpClient.post<Food>(this.baseURL + '/examplefood/add', foodAdd).pipe(
      tap({
        next: (food) =>{
          this.foodSubject.next(food);
          console.log('Successful Food Add!')
        },
        error: (errorResponse) => {
          console.log(errorResponse.error, 'Failed Food Add');
        }
      })
    );
  }

  deleteFood(foodDelete: FoodDelete): Subscription {
    return this.httpClient.delete<Food>(this.baseURL + '/food/' + foodDelete)
      .subscribe({
        next: (food) => {
          this.foodSubject.next(food);
          console.log('Successful Food Deleted!');
        },
        error: (errorResponse) => {
          console.log(errorResponse.error, 'Failed Food Deleted');
        }
      })
  }

  getFoodById(foodId:string):Observable<Food>{
    return this.httpClient.get<Food>(this.baseURL + '/food/' + foodId);
  }
}
