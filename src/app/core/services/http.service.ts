import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  /**
   * Sends a GET request to the specified URL and returns the response as an observable.
   * @param url The URL to send the request to.
   * @param options An optional object containing request options.
   * @returns An observable that emits the response data, or an error if the request fails.
   */
  get<T>(url: string, options?: any): Observable<any> {
    return this.http
      .get<T>(environment.baseUrl + url, options)
      .pipe(catchError((err) => this.errorHandler(err)));
  }
  /**
   * Sends a POST request to the specified URL with the given body and options.
   * @param url - The URL to which the request is sent.
   * @param body - The body of the request.
   * @param options - The options for the request.
   * @returns An observable of the HTTP response.
   */
  post<T>(url: string, body: any, options?: any): Observable<any> {
    return this.http
      .post<T>(environment.baseUrl + url, body, options)
      .pipe(catchError((err) => this.errorHandler(err)));
  }
  /**
   * Sends a PUT request to the specified URL with the given body and options.
   * @param url - The URL to send the request to.
   * @param body - The body of the request.
   * @param options - The options for the request.
   * @returns An Observable of the response body as type T.
   */
  put<T>(url: string, body: any, options?: any): Observable<any> {
    return this.http
      .put<T>(environment.baseUrl + url, body, options)
      .pipe(catchError((err) => this.errorHandler(err)));
  }
  /**
   * Sends a DELETE request to the specified URL.
   * @param url - The URL to which the request is sent.
   * @param options - The options to configure the request.
   * @returns An observable of the HTTP response.
   */
  delete(url: string, options?: any): Observable<any> {
    return this.http
      .delete(environment.baseUrl + url, options)
      .pipe(catchError((err) => this.errorHandler(err)));
  }
  /**
   * Handles errors thrown by HTTP requests.
   * @param error - The error object thrown by the HTTP request.
   * @returns An observable that emits the error object.
   */
  errorHandler(error: any) {
    console.log(error);
    return throwError(() => error);
  }
}
