import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  movieApiUrl = '/api/v1/movies';
  reviewApiUrl = '/api/v1/reviews';

  constructor(private httpClient: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.movieApiUrl);
  }

  getMovieByImdbId(imdbId: string) {
    return this.httpClient.get<Movie>(this.movieApiUrl + '/' + imdbId);
  }

  postReviews(review: PostReview) {
    return this.httpClient.post(this.reviewApiUrl, review);
  }
}

export interface PostReview {
  imdbId: string;
  reviewBody: string;
}
