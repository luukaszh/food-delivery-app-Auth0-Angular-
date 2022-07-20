import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FoodService} from "../../services/food.service";
import {Food} from "../../shared/models/food";
import {Observable} from "rxjs";
import {FoodDelete} from "../../shared/interfaces/foodDelete";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  foods: Food[] = [];

  isSubmit = false;

  addForm! : FormGroup;

  selected!: FoodDelete;

  authData = true;

  constructor(
    private foodService: FoodService,
    private formBuilder: FormBuilder,
  ) {
    let foodObservable: Observable<Food[]>

    foodObservable = foodService.getAll();

    foodObservable.subscribe((serverFoods) => {
      this.foods = serverFoods;
    })
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group(
      {
        name: [
          '',
          [Validators.required]],
        price: [
          '',
          [Validators.required]],
        cooktime: [
          '',
          [Validators.required]],
        imageurl: [
          '',
          [Validators.required]]
      });
  }

  onSubmit(){
    this.isSubmit = true;
    if (this.addForm.controls.invalid)
      return;

    this.foodService.addFood({
      name: this.addForm.controls.name.value,
      price: this.addForm.controls.price.value,
      cooktime: this.addForm.controls.cooktime.value,
      imageurl: this.addForm.controls.imageurl.value,
    }).subscribe(() => {
      window.location.reload();
    });
  }

  onDeleteSubmit(){
      this.foodService.deleteFood(this.selected);
  }

}
