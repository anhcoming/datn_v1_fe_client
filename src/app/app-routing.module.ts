import { ResetPasswordComponent } from './components/authentication/forgot-password/reset-password/reset-password.component';
import { BlogComponent } from './components/blog/blog.component';
import { SizeComponent } from './components/shop/size/size.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { ShopComponent } from './components/shop/shop.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AuthGuard } from './guards/auth.guard';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { PageNotFoundComponent } from './components/authentication/page-not-found/page-not-found.component';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout/success/:id', component: CheckoutSuccessComponent },
  { path: 'wishlist', component: WishListComponent, canActivate: [AuthGuard] },
  { path: 'shop/:slug', component: ShopComponent },
  { path: 'thong-tin-thanh-toan', component: PaymentInfoComponent },
  { path: 'size', component: SizeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  {
    path: '',
    loadChildren: () =>
      import('./components/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'user',
    component: MyAccountComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/my-account/my-account.module').then(
            (m) => m.MyAccountModule
          ),
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
