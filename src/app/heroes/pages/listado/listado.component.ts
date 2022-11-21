import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    `
      .parent {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
      }
      .card {
        max-width: 20%;
        min-width: 203px;
        margin: 10px;
      }
    `
  ]
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor( private heroesService: HeroesService) { }
  
  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe( heroes => this.heroes = heroes );
  }
}
