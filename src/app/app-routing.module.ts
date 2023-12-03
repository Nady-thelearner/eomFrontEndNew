import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { UpdatePassComponent } from './auth/update-pass/update-pass.component';
import { ForgetPassComponent } from './auth/forget-pass/forget-pass.component';
import { ResetPassComponent } from './auth/reset-pass/reset-pass.component';
import { CreateStoreComponent } from './store/create-store/create-store.component';
import { AddProductComponent } from './store/add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'update-pass',
    component: UpdatePassComponent,
  },

  {
    path: 'forget-pass',
    component: ForgetPassComponent,
  },
  {
    path: 'reset-pass',
    component: ResetPassComponent,
  },
  {
    path: 'create-store',
    component: CreateStoreComponent,
  },
  {
    path : 'add-product',
    component : AddProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
