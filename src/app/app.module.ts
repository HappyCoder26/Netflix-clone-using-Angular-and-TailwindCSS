import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { BannerComponent } from './core/components/banner/banner.component';
import { BrowseComponent } from './pages/browse/browse/browse.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { ImagePipe } from './shared/Pipes/image.pipe';
import { OverviewPipe } from './shared/Pipes/overview.pipe';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './core/components/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './shared/components/spinner/loading-spinner/loading-spinner.component';
import { MovieDetailsComponent } from './shared/components/movie-details/movie-details.component';
import { RemoveAfterAtSymbolPipe } from './shared/Pipes/remove-after-at-symbol.pipe';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    BrowseComponent,
    CarouselComponent,
    ImagePipe,
    OverviewPipe,
    AuthComponent,
    LoadingSpinnerComponent,
    MovieDetailsComponent,
    RemoveAfterAtSymbolPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
