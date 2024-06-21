import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { Movie, Review } from '../models/movie';
import { HttpSentEvent } from '@angular/common/http';
import { HttpService } from './http.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies: WritableSignal<Movie[]> = signal([]);
  selectedMovie: WritableSignal<Movie> = signal(this.defaultMovie());

  embeddedTrailer: Signal<SafeResourceUrl> = computed(() => {
    if (this.movies()) {
      const videoId = this.getVideoId(this.selectedMovie()!?.trailerLink);
      return this.sanitizen.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0`
      );
    }
    return this.sanitizen.bypassSecurityTrustResourceUrl('');
  });

  constructor(
    private httpServcie: HttpService,
    private sanitizen: DomSanitizer
  ) {}

  defaultMovie(): Movie {
    return {
      backdrops: [],
      genres: [],
      imdbId: '',
      poster: '',
      releaseDate: '',
      reviewIds: [],
      title: '',
      trailerLink: '',
    };
  }
  getMovies() {
    this.httpServcie.getMovies().subscribe((movies) => {
      this.movies.set(movies);
    });
  }
  getMovie(imdbId: string) {
    this.httpServcie.getMovieByImdbId(imdbId).subscribe((movie: Movie) => {
      this.selectedMovie.set(movie);
    });
  }
  getVideoId(url: string) {
    return url.substring(url.indexOf('?v=') + 3);
  }
}
