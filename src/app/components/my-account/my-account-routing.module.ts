import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MyDiscountComponent } from './my-discount/my-discount.component';

const routes: Routes = [
  { path: 'profile', component: AccountComponent },
  { path: 'my-order', component: MyOrderComponent },
  { path: 'order-detail/:id', component: OrderDetailComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'address', component: MyAddressComponent },
  { path: 'discount', component: MyDiscountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAccountRoutingModule {}
