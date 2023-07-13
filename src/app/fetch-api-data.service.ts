import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-88009.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

// Exporting the FetchApiDataService so that the app can use it
export class FetchApiDataService {
// Inject the HttpClient module to the constructor params
// This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
// Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

// Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
// Making the api call to get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
// Making the api call to get a single movie by title
  getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
// Making the api call to get a director by name
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/:DirectorName', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
// Making the api call to get a genre by name
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:GenreName', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
// Making the api call to get a user by username
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('user._id');
    return this.http.get(apiUrl + `users/${userID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
// Making the api call to get a user's favorite movies
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('user._id');
    return this.http.get(apiUrl + `users/${userID}/movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
// Making the api call to add a movie to a user's list of favorites
  addFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('user._id');
    const movieID = localStorage.getItem('movie._id');
    return this.http.post(apiUrl + `users/${userID}/movies/${movieID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
// Making the api call to edit a user's info
  editUserInfo(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('user._id');
    return this.http.put(apiUrl + `users/${userID}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
// Making the api call to delete a user's account
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('user._id');
    return this.http.delete(apiUrl + `users/${userID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
// Making the api call to delete a movie from a user's list of favorites
  deleteFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('user._id');
    const movieID = localStorage.getItem('movie._id');
    return this.http.delete(apiUrl + `users/${userID}/${movieID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }

// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }
// Error handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}