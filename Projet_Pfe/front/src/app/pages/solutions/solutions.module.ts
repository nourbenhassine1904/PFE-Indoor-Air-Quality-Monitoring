import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SolutionsComponent } from './solutions.component';
import { SolutionsService } from './solutions.service';

@NgModule({
  declarations: [
    SolutionsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    SolutionsService
  ]
})
export class SolutionsModule { }