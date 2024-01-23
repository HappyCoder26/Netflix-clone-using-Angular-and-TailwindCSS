import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const options = {
  parameters: {
    include_adult:'false',
    include_video:'false',
    language:'en-US',
    page:'1',
    sort_by:'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2ZlMGFhYTA5ZWIxNWZhMmY5ZWM0NmM4YTBhZDJmMSIsInN1YiI6IjY0NzVhOGU3ZGQyNTg5MDEwMTdmNzhkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GSb8kmTcJZWPBri9vZnB7gB74lOB8cF5DcRa8SbNGrQ'
  }
}

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http:HttpClient) { }

  getMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', options)
  }

  getTvShows() {
    return this.http.get('https://api.themoviedb.org/3/discover/tv', options)
  }

  getNowPlayingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing', options)
  }

  getPopularMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular', options)
  }

  getUpcomingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming', options)
  }

  getTopRated() {
    return this.http.get('https://api.themoviedb.org/3/movie/top_rated', options)
  }

  getBannerVideo(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
  }

  getBannerDetail(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, options);
  }
}
