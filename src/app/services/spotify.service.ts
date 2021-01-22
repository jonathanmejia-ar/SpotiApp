import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private client_id: string = 'b989ccb9baad4745ac14317192cc14f8';
  private client_secret: string = 'ac5c9cb767bf496b8f8b3ebd763ebfb4';
  private tkn: string //= 'Bearer BQBT6MJJqEgxHC8hJ94OCOm-WbcBb0CetlRayyEBvL5ZjAFVYwlN51jnApvWCplXIZh7CvcM170B1S0dSlo';

  constructor(private http: HttpClient) {
    console.log('Spotify Service');
  }

  getToken() {
    return this.http.get(`https://spotifyapp-tokengenerator.herokuapp.com/spotify/${this.client_id}/${this.client_secret}`)
      .pipe(map((token: any) => this.tkn = `Bearer ${token.access_token}`));
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': this.tkn
    });
    return this.http.get(url, { headers });
  }

  searchArtist(term: string) {
    return this.getQuery(`search?q=${term}&type=artist&limit=21`)
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
