import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | any;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero() {
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    
    if (id != null) {
      this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
    }
    console.log(this.hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.hero.heroId = 0;
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
