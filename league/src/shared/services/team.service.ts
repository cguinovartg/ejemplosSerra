import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ResponseModel } from '../interfaces/responseModel';
import { TeamDTO } from '../interfaces/team';
import { environment } from '../../environments/environment';

@Injectable()
export class TeamService {

  private url = `${environment.base_url}/rws-team-service`;

  constructor(private http: HttpClient) { }

  createTeam(team: TeamDTO): Observable<ResponseModel<any>> {
    return this.http.get<ResponseModel<any>>(this.url);
  }
}
