import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importez FormsModule et ReactiveFormsModule
import { ContactComponent } from './contact.component';
import { ContactService } from './contact.service';


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule, // Importez FormsModule si nécessaire
    ReactiveFormsModule
  ],
  
  providers: [
    ContactService
  ],

  exports: [
   
    FormsModule,
    ReactiveFormsModule
  ],
  
})
export class AppModule { }
