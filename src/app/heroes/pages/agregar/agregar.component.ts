import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: Publisher.DCComics,
      description: 'DC - Comics'
    },
    {
      id: Publisher.MarvelComics,
      description: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: 'assets/no-image.png'
  }

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesService.getHeroePorId(id))
      ).subscribe( heroe => this.heroe = heroe)
    }
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return
    }
    if (this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe).subscribe(
        heroe => this.mostrarSnackBar('Registro actualizado!'));
    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe(
        heroe => {
          heroe.alt_img = heroe.alt_img ? heroe.alt_img : 'assets/no-image.png'
          this.router.navigate(['/heroes/editar', heroe.id])
          this.mostrarSnackBar('Registro creado!')
        });
    }
  }

  borrar() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '30vw',
      data: this.heroe
    });
    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.heroesService.borarHeroe(this.heroe.id!).subscribe(
            response => {
              this.router.navigate(['/heroes'])
          });
        } 
      }
    )
    
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Ok', {duration: 2500} )
  }
}
