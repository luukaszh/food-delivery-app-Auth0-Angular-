import { Component, OnInit } from '@angular/core';
import {Food} from "../../shared/models/food";
import {FoodService} from "../../services/food.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];

  searchText: string = '';

  constructor(
    private foodService: FoodService,
  ) {
    let foodObservable: Observable<Food[]>

    foodObservable = foodService.getAll();

    foodObservable.subscribe((serverFoods) => {
      console.log(serverFoods)
      this.foods = serverFoods;
    })
  }

  ngOnInit(): void {
  }

  onSearch(searchValue: string){
    this.searchText = searchValue.toLowerCase();
  }

}
