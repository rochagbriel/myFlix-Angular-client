import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoCardComponent } from '../info-card/info-card.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  movies: any[] = [];

  constructor(
    private userService: UserService,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log(this.movies);
      return this.movies;
    });
  }

  getGenre(name: string, description: string): void {
    this.dialog.open(InfoCardComponent, {
      data: {
        title: `Genre: ${name}`,
        description: description,
      }
    });
  }

  getDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(InfoCardComponent, {
      data: {
        title: `Director: ${name}`,
        description: `${bio} Born: ${birth}`,
      }
    });
  }

  getMovieDescription(title: string, description: string): void {
    this.dialog.open(InfoCardComponent, {
      data: {
        title: `Synopsis: "${title}"`,
        description: description,
      }
    });
  }

  isFavorite(id: string): boolean {
    const user = localStorage.getItem('user');
    const favorites = JSON.parse(user!).FavoriteMovies;
    return favorites.includes(id);
  }

  addFavoriteMovie(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((resp: any) => {
      console.log(resp);
      let movie = this.movies.find((m: any) => m._id === id).Title;
      this.snackBar.open(
        `"${movie}" has been added to your favorites!`, 'OK', {
        duration: 2000
      });
      this.userService.setUser(resp);
    });
  }

  deleteFavoriteMovie(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((resp: any) => {
      console.log(resp);
      let movie = this.movies.find((m: any) => m._id === id).Title;
      this.snackBar.open(
        `"${movie}" has been removed from your favorites!`, 'OK', {
        duration: 2000
      });
      this.userService.setUser(resp);
    });
  }
}
