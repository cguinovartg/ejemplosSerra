import { ResponseModel } from './../interfaces/responseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';
import { Mediator } from '../interfaces/mediator';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserService {

  private _baseUrl: string;

  private errorResponse: ResponseModel<any> = {};

  constructor(
    private http: HttpClient
  ) {
    this._baseUrl = environment.base_url;
  }

  /**
   * GET all mediators from rws-user-account
   * @param paNumber pa number to fetch all mediators
   */
  getMediators(paNumber): Observable<ResponseModel<Mediator>> {
    return this.http.get<ResponseModel<Mediator>>(`${this._baseUrl}/rws-user-account/api/agent-accounts/agents?mediator=${paNumber}`)
      .pipe(
        catchError(this.handleError('getMediators', this.errorResponse))
      );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log('SERVICE ERROR');
      console.error(error); // log to console instead
      this.errorResponse.error = error;
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
