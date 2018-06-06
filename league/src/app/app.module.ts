// Angular
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
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
  NxLoggerSettings,
  TranslateConfig,
  TranslateLoader,
  TranslateHttpLoader
} from '@allianz/core';

// Epac
import { NxEpacHeaderModule, NxEpacParamsService, NxEpacResizeService } from '@allianz/epac';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const translateSettings: TranslateConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [HttpClient] }
};

const loggerSettings: NxLoggerSettings = {
  isDebugEnabled: true,
  sendToBackend: true,
  urlBackendService: `${environment.base_url}/rws-bff-boilerplate/api/logs`,
};

export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}
const securitySettings: NxSecuritySettings = {
  config: {
    tokenGetter: tokenGetter,
    whitelistedDomains: [`${environment.domain}`]
  }
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    routing,
    SharedModule.forRoot(),
    NxCoreModule.forRoot(
      loggerSettings, /** logger settings */
      translateSettings, /** translate settings */
      securitySettings /** security settings */
    ),
    NxEpacHeaderModule
  ],
  providers: [
    NxEpacParamsService,
    NxEpacResizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
