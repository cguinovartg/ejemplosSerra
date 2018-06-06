import { TestBed, inject, async } from '@angular/core/testing';

import { DataRequestService } from './data-request.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, HttpModule, XHRBackend, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

xdescribe('Service: DataRequestService', () => {
    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                DataRequestService
            ],
            imports: [
              HttpClientModule
            ]
        }).compileComponents();
    });
});
