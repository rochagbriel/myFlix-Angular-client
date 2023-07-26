import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-88009.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

/** Exporting the FetchApiDataService so that the app can use it
 * @export
 * @class FetchApiDataService
 * */
export class FetchApiDataService {

  editUser(userData: { Username: string; Password: string; Email: string; Birthday: string; }) {
    throw new Error('Method not implemented.');
  }
// Inject the HttpClient module to the constructor params
// This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
/** Making the api call for the user registration endpoint
 * @param userDetails
 * @returns confirmation message
 * @async
 * */
  public userRegistration(userDetails: any): Observable<any> {
    // console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

/** Making the api call for the user login endpoint
 * @param userDetails
 * @returns user object and token
 * @async
 * */
  public userLogin(userDetails: any): Observable<any> {
    // console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

/** Get a user by username
 * @param username
 * @returns user object
 * @async
 * */
  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user;
  }

/** Making the api call to get all movies
 * @returns movies array
 * @async
 * */
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
/** Making the api call to get a single movie by title
 * @param title
 * @returns movie object
 * @async
 * */
  getMovie(title : string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
/** Making the api call to get a director by name
 * @param directorName
 * @returns director object
 * @async
 * */
  getDirector(directorName : string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
/** Making the api call to get a genre by name
 * @param genreName
 * @returns genre object
 * @async
 * */
  getGenre(genreName : string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/** Making the api call to add a movie to a user's list of favorites
 * @param movieID
 * @returns confirmation message
 * @async
 * */
  addFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
    return this.http.post(apiUrl + `users/${userID}/movies/${movieID}`, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  /** Making the api call to delete a movie from a user's list of favorites
   * @param movieID
   * @returns confirmation message
   * @async
   * */
  deleteFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
    return this.http.delete(apiUrl + `users/${userID}/${movieID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }
/** Making the api call to edit a user's info
 * @param userDetails
 * @returns confirmation message
 * @async
 * */
  editUserInfo(updateUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
    return this.http.put(apiUrl + `users/${userID}`, updateUser, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
/** Making the api call to delete a user's account
 * @returns confirmation message
 * @async
 * */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
    return this.http.delete(apiUrl + `users/${userID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
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