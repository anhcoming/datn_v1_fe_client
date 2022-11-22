import { Component, OnInit } from '@angular/core';
import { Favourite } from 'src/app/models/favourite';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  public favourites : Favourite[] = [];

  constructor(
    private favouriteService: FavouriteService
  ) { }

  ngOnInit() {
    this.getListFavourite();
  }

  getListFavourite() {
    this.favouriteService.getListFavourite().subscribe({
      next: (response: any) => {
        this.favourites = response.data;
      },error: (err) => {
        console.log('error', err);
      }
    })
  }

  deleteFavourite(id:string) {
    this.favouriteService.deleteFavourite(id).subscribe({
      next: () => {
        this.getListFavourite();
      },error: (err) => {
        console.log('error', err);
      }
    })
  }

}
