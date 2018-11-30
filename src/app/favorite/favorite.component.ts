import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { IFavorite } from '../interfaces/IFavorite';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favorites: IFavorite[];
  cols: any[];

  constructor(
    private favoriteService: FavoriteService
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'quantity', header: ''},
      { field: 'foodname', header: ''}
    ];

    this.favoriteService
    .getFavorites()
    .subscribe(favorites => {
      this.favorites = favorites;
    });
  }
}
