import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  public customer!: Customer;

  constructor(
    private router: Router,
    private tokenService: TokenStorageService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getCurrentUserProfile();
  }

  getCurrentUserProfile() {
    this.userService.getCurrentUserProfile().subscribe({
      next: (response) => {
        console.log('response current user', response);
        this.customer = response;
        console.log('customer', this.customer);
      },error: (err) => {
        console.log('error get current user :', err);
      }
    })
  }

  logout(){
    this.tokenService.signOut();
    window.location.reload();
    this.router.navigate(['/home']);
  }

}
