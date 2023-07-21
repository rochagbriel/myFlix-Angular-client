import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  favoriteMovies: any = [];

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    const date = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US');
    this.userData = {
      Username: this.user.Username,
      Password: this.user.Password,
      Email: this.user.Email,
      Birthday: date
    };
  }


  editUser(): void {
    this.fetchApiData.editUserInfo(this.userData).subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('Username', data.Username);
      // console.log(data);
      this.snackBar.open('Profile updated successfully!', 'OK', {
        duration: 2000
      })
      window.location.reload();
    }, (result: any) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      })
    });
  }

  deleteUser(): void {
   if (confirm('Are you sure you want to delete your account?')) {
    this.router.navigate(['welcome']).then(() => {
      this.snackBar.open('Account deleted successfully!', 'OK', {
        duration: 2000
      });
      this.fetchApiData.deleteUser().subscribe((resp: any) => {
        localStorage.clear();
      }
      );
    });
  }
}
}

