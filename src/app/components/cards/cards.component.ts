import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  @Input() items: any[] = [];

  isArtist: boolean;
  currentRoute: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const url = this.activatedRoute.snapshot['_routerState'].url;
    if (url === '/search') {
      this.isArtist = true;
    } else {
      this.isArtist = false;
    }
  }

  sendArtistId(item: any) {
    let target;
    if (item.type === 'artist') {
      target = item.id;
    } else {
      target = item.artists[0].id;
    }
    this.router.navigate([`/artist/${target}`]);
  }

}
