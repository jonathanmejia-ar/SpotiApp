import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service');
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAU1dH97q4YZ8XT21Doc6039CnEi6t9uH1P8ixHQqCdSsAyRVlY4SsHZIhv9EXzNpl_lrQYMbFpTk0Uisg'
    });
    return this.http.get(url, { headers });
  }

  searchArtist(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=21`)
      .pipe(map((data: any) => data.artists.items));
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=21')
      .pipe(map(data => data['albums'].items));
  }

  getArtist(artistId: string) {
    return this.getQuery(`artists/${artistId}`);
  }

  getTopTracks(artistId: string) {
    return this.getQuery(`artists/${artistId}/top-tracks?country=us`)
      .pipe(map(data => data['tracks']));
  }
}
