import { ResponseModel } from './../interfaces/responseModel';
import { SearchRequest } from './../interfaces/search-request';
import { PetitionProduct } from './../interfaces/petition';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { DataRequestDTO } from '../interfaces/dataRequestdto';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { DetailRequest } from '../interfaces/detail-request';

@Injectable()
export class DataRequestService {

  private _baseUrl: string;

  private errorResponse: ResponseModel<any> = {};

  constructor(
    private http: HttpClient
  ) {
    this._baseUrl = environment.base_url;
  }

  getDataDetail(requestNumber): Observable<ResponseModel<DetailRequest>> {
    return this.http.get(`${this._baseUrl}/rws-data-requests-app-web/datarequests/${requestNumber}`);
  }

  getDataSearch(
    agent: string,
    dateFrom?: string,
    dateTo?: string,
    limit?: string,
    offset?: string,
    orderBy?: string,
    requestStatus?: string,
    requestType?: string
  ): Observable<ResponseModel<SearchRequest>> {

    let params = new HttpParams()
      .set('Agent', agent);

    if (limit) {
      params = params.set('Limit', limit);
    }
    if (dateFrom) {
      params = params.set('DateFrom', dateFrom);
    }
    if (dateTo) {
      params = params.set('DateTo', dateTo);
    }
    if (offset) {
      params = params.set('Offset', offset);
    }
    if (orderBy) {
      params = params.set('OrderBy', orderBy);
    }
    if (requestStatus) {
      params = params.set('RequestStatus', requestStatus);
    }
    if (requestType) {
      params = params.set('RequestType', requestType);
    }

    return this.http.get<ResponseModel<SearchRequest>>(`${this._baseUrl}/rws-data-requests-app-web/search/requests?${params.toString()}`)
      .pipe(
        catchError(this.handleError('getDataSearch', this.errorResponse))
      );
  }

  postCreateDataRequest(data: DataRequestDTO) {
    console.log(data);
    return this.http.post(`${this._baseUrl}/rws-data-requests-app-web/datarequests`, data)
    .pipe(
      catchError(this.handleError('getDataSearch', this.errorResponse))
    );
  }

  getListOtherTypes(): Observable<ResponseModel<PetitionProduct>> {
    return this.http.get<ResponseModel<PetitionProduct>>(`${this._baseUrl}/rws-data-requests-app-web/datarequests/listothertypes`)
      .pipe(
        catchError(this.handleError('getListOtherTypes', this.errorResponse))
      );
  }

  validateReceipt(receiptId: any) {
    return this.http.get(`${this._baseUrl}/rws-data-requests-app-web/datarequests/validateReceipt?receiptId=${receiptId}`);
  }

  validatePolicy(policyId: any) {
    return this.http.get(`${this._baseUrl}/rws-data-requests-app-web/datarequests/validatePolicy?policyId=${policyId}`);
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
