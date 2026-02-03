import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importez FormsModule et ReactiveFormsModule
import { LoginComponent } from './login.component';
import { AuthService } from './login.service';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule, // Importez FormsModule si nécessaire
    ReactiveFormsModule
  ],
  
  providers: [
    AuthService
  ],

  exports: [
   
    FormsModule,
    ReactiveFormsModule
  ],
  
})
export class AppModule { }
