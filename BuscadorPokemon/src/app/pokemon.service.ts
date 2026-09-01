import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Pokemon {
  name: string;
  image: string;
}

// Respuesta parcial de la PokéAPI (solo lo que usamos).
interface PokeApiResponse {
  name: string;
  sprites: {
    other?: {
      ['official-artwork']?: { front_default: string | null };
    };
    front_default: string | null;
  };
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemon(name: string): Observable<Pokemon> {
    const query = name.trim().toLowerCase();
    return this.http.get<PokeApiResponse>(`${this.baseUrl}/${query}`).pipe(
      map((res) => ({
        name: res.name,
        image:
          res.sprites.other?.['official-artwork']?.front_default ||
          res.sprites.front_default ||
          '',
      })),
    );
  }
}
