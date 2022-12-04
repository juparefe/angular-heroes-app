import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private dataBaseUrl = environment.dataBaseUrl;

  constructor(private http: HttpClient) { }

  getHeroes() {
    return this.http.get<Heroe[]>(`${this.dataBaseUrl}/heroes`);
  }

  getHeroesPorTermino(termino: string) {
    return this.http.get<Heroe[]>(`${this.dataBaseUrl}/heroes?q=${termino}&_limit=5`);
  }

  getHeroePorId(id: string) {
    return this.http.get<Heroe>(`${this.dataBaseUrl}/heroes/${id}`);
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(
      `${this.dataBaseUrl}/heroes/`, 
      heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(
      `${this.dataBaseUrl}/heroes/${heroe.id}`, 
      heroe);
  }

  borarHeroe(id: string): Observable<any> {
    return this.http.delete(`${this.dataBaseUrl}/heroes/${id}`);
  }
}
