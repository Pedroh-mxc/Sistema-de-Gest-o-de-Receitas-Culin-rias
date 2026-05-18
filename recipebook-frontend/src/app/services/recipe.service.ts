import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly API = 'http://localhost:8080/api/receitas';

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.API);
  }

  buscarPorId(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.API}/${id}`);
  }

  criar(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.API, recipe);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
