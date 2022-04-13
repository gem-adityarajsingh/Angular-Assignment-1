import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { UsersRoutingModule } from './users-routing.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


console.log("users module loaded");
@NgModule({
  declarations: [
    CreateComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
