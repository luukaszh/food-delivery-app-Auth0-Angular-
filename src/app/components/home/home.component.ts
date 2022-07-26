import { Component, OnInit } from '@angular/core';
import {Food} from "../../shared/models/food";
import {FoodService} from "../../services/food.service";
import {Observable} from "rxjs";
import {AuthService} from "@auth0/auth0-angular";

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
    public auth: AuthService,
  ) {
    let foodObservable: Observable<Food[]>

    foodObservable = foodService.getAll();

    foodObservable.subscribe({
      next: (serverFoods) => {
        this.foods = serverFoods;
      },
      error: (err) => {
        this.auth.loginWithRedirect();
      }
    })
  }

  ngOnInit(): void {
  }

  onSearch(searchValue: string){
    this.searchText = searchValue.toLowerCase();
  }

}
