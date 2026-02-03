import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { authService } from './services/authentication.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';






import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './sharedpage/navbar/navbar.component';
import { LoggedInNavbarComponent } from './sharedpage/logged-in-navbar/logged-in-navbar.component';
import { FooterComponent } from './sharedpage/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { TicketEditingInterfaceComponent } from './pages/ticket-editing-interface/ticket-editing-interface.component';
import { UserEditingInterfaceComponent } from './pages/user-editing-interface/user-editing-interface.component';
import { LoginComponent } from './pages/login/login.component';
import { AppareilsComponent } from './pages/appareils/appareils.component';
import { SolutionsComponent } from './pages/solutions/solutions.component';
import { AdminNavbarComponent } from './sharedpage/admin-navbar/admin-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { SolutionsService } from './pages/solutions/solutions.service';
import { ContactService } from './pages/contact/contact.service';
import { SignupService } from './pages/signup/signup.service';
import { UserEditingInterfaceService } from './pages/user-editing-interface/user-editing-interface.service';








@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    NavbarComponent,
    LoggedInNavbarComponent,
    FooterComponent,
    HomeComponent,
    SignupComponent,
    AboutComponent,
    ContactComponent,
    DashboardComponent,
    
    UserProfileComponent,
    TicketEditingInterfaceComponent,
    UserEditingInterfaceComponent,
    LoginComponent,
    AppareilsComponent,
    SolutionsComponent,
    AdminNavbarComponent,
   
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    RouterModule.forRoot([]),
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [authService,
    SolutionsService,
    ContactService,
    SignupService,
    UserEditingInterfaceService,
    
    

  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
