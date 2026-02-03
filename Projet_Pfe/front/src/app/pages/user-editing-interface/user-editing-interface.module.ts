import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserEditingInterfaceComponent } from './user-editing-interface.component';
import { UserEditingInterfaceService } from './user-editing-interface.service';

@NgModule({
  declarations: [UserEditingInterfaceComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [UserEditingInterfaceComponent],
  exports: [UserEditingInterfaceService]
})
export class UserProfileModule { }
