import { Component, Input, OnInit } from '@angular/core';
import { Observable, forkJoin, map, tap, filter } from 'rxjs';
import { videoData } from 'src/app/shared/models/videoData.interface';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  randomValue!: number;

  movies: videoData[] = [];
  popularMovies: videoData[] = [];
  nowPlayingMovies: videoData[] = [];
  tvShows: videoData[] = [];
  upcomingMovies: videoData[] = [];
  topRatedMovies: videoData[] = [];

  bannerDetails$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();
  trailerKey = '';


  source = [
    this.movieService.getMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getTvShows(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getTopRated()
  ]

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {

    this.randomValue = Math.floor(Math.random() * 20);
    console.log(this.randomValue);

    forkJoin(this.source)
      .pipe(
        map(([movies, popularMovies, nowPlayingMovies, tvShows, upcomingMovies, topRatedMovies]) => {
          this.bannerDetails$ = this.movieService.getBannerDetail(popularMovies.results[this.randomValue].id)
          this.bannerVideo$ = this.movieService.getBannerVideo(popularMovies.results[this.randomValue].id)
          this.getTrailerKey();
          return { movies, popularMovies, nowPlayingMovies, tvShows, upcomingMovies, topRatedMovies }
        }),
      ).subscribe((res: any) => {
        this.movies = res.movies.results as videoData[];
        this.popularMovies = res.popularMovies.results as videoData[];
        this.nowPlayingMovies = res.nowPlayingMovies.results as videoData[];
        this.tvShows = res.tvShows.results as videoData[];
        this.upcomingMovies = res.upcomingMovies.results as videoData[];
        this.topRatedMovies = res.topRatedMovies.results as videoData[];
        console.log(this.popularMovies)
      })
  }

  getTrailerKey() {
    this.bannerVideo$.pipe(
      map((data: any) => {
        return data.results.find((item: any) => { return item.type === 'Trailer' });
      })
    ).subscribe((res) => {
      this.trailerKey = res.key;
    });
  }




}
