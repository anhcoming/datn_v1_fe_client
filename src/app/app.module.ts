import { AuthenticationModule } from './components/authentication/authentication.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { RelatedProductsComponent } from './components/product-detail/related-products/related-products.component';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShopComponent } from './components/shop/shop.component';
import { SizeComponent } from './components/shop/size/size.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { JwtModule } from '@auth0/angular-jwt';
import { CurrencyPipe } from './pipes/currency.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyAccountModule } from './components/my-account/my-account.module';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';
import { BlogComponent } from './components/blog/blog.component';
import { PaymentInfoComponent } from './components/payment-info/payment-info.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';
import { ProductComponent } from './components/shop/product/product.component';
// import { NgxUiLoaderComponent } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyPipe,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductDetailComponent,
    RelatedProductsComponent,
    CartComponent,
    ContactComponent,
    ShopComponent,
    SizeComponent,
    WishListComponent,
    CheckoutComponent,
    CheckoutSuccessComponent,
    BlogComponent,
    BlogDetailComponent,
    PaymentInfoComponent,
    BlogComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthenticationModule,
    MyAccountModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('auth-token');
        },
        allowedDomains: ['localhost:8888'],
      },
    }),
    //NgxSliderModule,
    MaterialModule,
    ToastrModule.forRoot(),
    NgbModule,
    CarouselModule,
    SlickCarouselModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
