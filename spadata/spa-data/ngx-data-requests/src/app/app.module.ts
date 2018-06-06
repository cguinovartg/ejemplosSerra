// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SharedModule } from '../shared/shared.module';
import { environment } from './../environments/environment';

// Core
import {
  NxSecuritySettings,
  NxCoreModule,
  NxDefaultLoggerSettings,
  NxLoggerSettings,
  StorageType
} from '@allianz/core';
import { TranslateConfig, TranslateLoader, TranslateHttpLoader } from '@allianz/core';

// Epac
import { NxEpacHeaderModule, NxEpacParamsService, NxEpacResizeService } from '@allianz/epac';

// Ndbx
import { NxIconModule, NxInputModule, NxButtonModule } from '@allianz/ngx-ndbx';

export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}
const securitySettings: NxSecuritySettings = {
  config: {
    tokenGetter: tokenGetter,
    whitelistedDomains: [`${environment.domain}`]
  }
};

const loggerSettings: NxLoggerSettings = {
  isDebugEnabled: true, // This will enable/disable the module
  sendToBackend: false, // This will enable the option to send logs to a backEnd server.
  urlBackendService: `${environment.base_url}/rws-data-requests/api/logs`, // This is the URL of the backEnd.
  extraParams: []
};

export function createTranslateLoader(http: HttpClient) {
  /** link translations */
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const translateSettings: TranslateConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [HttpClient] }
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    SharedModule.forRoot(),
    NxCoreModule.forRoot(
      loggerSettings, /** logger settings */
      translateSettings, /** translate settings */
      securitySettings /** security settings */
    ),
    NxEpacHeaderModule,
    NxIconModule,
    NxInputModule,
    NxButtonModule
  ],
  providers: [
    NxEpacParamsService,
    NxEpacResizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
