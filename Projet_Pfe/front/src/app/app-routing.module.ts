import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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




const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'signup',component:SignupComponent},
  {path:'login', component: LoginComponent },
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path: 'dashboard', component: DashboardComponent },
  { path: 'ticket-editing-interface', component: TicketEditingInterfaceComponent },
  { path: 'user-editing-interface', component: UserEditingInterfaceComponent },
  {path: 'user-profile', component: UserProfileComponent },
  {path: 'appareils', component: AppareilsComponent },
  {path: 'solutions', component: SolutionsComponent },
  { path: 'ticket-editing-interface/:id', component: TicketEditingInterfaceComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
