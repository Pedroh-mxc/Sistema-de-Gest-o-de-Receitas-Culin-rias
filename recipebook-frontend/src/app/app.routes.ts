import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/recipe-list/recipe-list.component').then(m => m.RecipeListComponent)
  },
  {
    path: 'nova',
    loadComponent: () =>
      import('./pages/recipe-form/recipe-form.component').then(m => m.RecipeFormComponent)
  },
  {
    path: 'receita/:id',
    loadComponent: () =>
      import('./pages/recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent)
  },
  { path: '**', redirectTo: '' }
];
