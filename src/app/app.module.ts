import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// decalred 
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { HeaderComponent } from './components/header/header.component';
import { ProfileSummaryComponent } from './components/profile-summary/profile-summary.component';
import { InterceptorService, InterceptorProvider } from './services/interceptor.service';
import { ProfileScreeningService } from './services/profile-screening.service';
import { FiltersComponent } from './components/filters/filters.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileSummaryComponent,
    FiltersComponent,
    ProfileDetailsComponent,
    ProfilesListComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    AppRoutes,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [
    InterceptorProvider,
    InterceptorService,
    ProfileScreeningService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
