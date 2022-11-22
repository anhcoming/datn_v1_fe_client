import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter, interval, Subscription, timer } from 'rxjs';
import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/cart.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { UserService } from '../../services/user.service';
import { Notification } from './../../models/notification';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  public cartItem!: CartItem;

  notifications: Notification[] = [];
  numberNotiUnRead: number = 0;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private tokenService: TokenStorageService,
    private cartService: CartService,
    private dialog: MatDialog,
    private userService: UserService
  ) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.init();
      });
  }

  ngOnInit(): void {
    const obs$ = interval(10000);
    this.subscription = obs$.subscribe((x) => {
      this.getTop3Notification();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  init() {
    this.isLoggedIn = this.tokenService.loggedIn();
    this.getCartItemCount();
  }

  getCartItemCount() {
    if (this.isLoggedIn) {
      this.cartService.countItemInCart().subscribe({
        next: (res: any) => {
          console.log('data : ', res);
          this.cartItem = res?.data;
          console.log('cartItem:', this.cartItem);
        },
        error: (err) => {
          console.log('error: ', err);
        },
      });
    }
  }

  logout() {
    this.tokenService.signOut();
    window.location.reload();
    this.router.navigateByUrl('/home');
    window.location.reload();
  }
  info() {
    this.router.navigateByUrl('/account');
  }

  getTop3Notification() {
    //when call api getTop3Notification , noLoading request

    this.userService.getTop3Notification().subscribe({
      next: (res: any) => {
        console.log('data : ', res);
        this.notifications = res.data.notifications;
        this.numberNotiUnRead = res.data.unreadNumber;
        console.log('notifications:', this.notifications);
        console.log('numberNotiUnRead:', this.numberNotiUnRead);
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });
  }

  readNotificationById(id: string, type: any, objectId: any) {
    this.userService.readNotification(id).subscribe({
      next: (res: any) => {
        console.log('data : ', res);
        if (type == 'ORDER') {
          this.router.navigateByUrl('/user/order-detail/' + objectId);
        }

        if (type == 'USER') {
          this.router.navigateByUrl('/product-detail/' + objectId);
        }
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });
  }

  readAllNotification() {
    this.userService.readAllNotification().subscribe({
      next: (res: any) => {
        console.log('data : ', res);
        this.getTop3Notification();
      },
      error: (err) => {
        console.log('error: ', err);
      },
    });
  }
}
