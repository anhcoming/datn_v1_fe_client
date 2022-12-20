import { Router, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  check = false;
  title = 'ws-client';

  public currentUrl: string = "";
  constructor(private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
      if (this.currentUrl == "/login" || this.currentUrl == "/sign-up" ||
        this.currentUrl == "/forgot-password"||this.currentUrl.includes("reset-password")
      ) {
        this.check = true
      } else {
        this.check = false
      }
    });

    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 100);
  }
}
