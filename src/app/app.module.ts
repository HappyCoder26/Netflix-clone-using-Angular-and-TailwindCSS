import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './core/components/banner/banner.component';
import { BrowseComponent } from './pages/browse/browse/browse.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { OverviewPipe } from './shared/Pipes/overview.pipe';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './core/components/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './shared/components/spinner/loading-spinner/loading-spinner.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SharedModule } from './shared/module/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    BrowseComponent,
    CarouselComponent,
    OverviewPipe,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
