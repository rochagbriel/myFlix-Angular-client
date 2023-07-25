import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any = [];
  date: any = '';

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    private userService: UserService,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  updateDataHandler(obj: any): any {
    const newUserData: Record<string, any> = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== '') {
        newUserData[key] = obj[key];
      }
    });
    return newUserData;
  }

  getUserInfo(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.date = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US');
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((movie: any) =>
        this.user.FavoriteMovies.includes(movie._id)
      );
      // console.log(this.favoriteMovies);
    });
  }

  editUser(): void {
    const newData = this.updateDataHandler(this.userData);
    this.fetchApiData.editUserInfo(newData).subscribe((result) => {
      // Logic for a successful user registration goes here!
      // console.log(newData);
      this.snackBar.open('Your data was successful updated', 'OK', {
        duration: 2000,
      });
      this.userService.setUser(result);
      window.location.reload();
    });
  }

  deleteFavoriteMovie(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((resp: any) => {
      // console.log(resp);
      this.snackBar.open(`Movie removed from favorites!`, 'OK', {
        duration: 2000,
      });
      this.userService.setUser(resp);
      window.location.reload();
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Account deleted successfully!', 'OK', {
          duration: 2000,
        });
        this.fetchApiData.deleteUser().subscribe((resp: any) => {
          localStorage.clear();
        });
      });
    }
  }
}
