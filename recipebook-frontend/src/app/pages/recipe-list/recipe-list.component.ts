import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe, CATEGORIA_LABELS, CATEGORIA_COLORS } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="container">

      <!-- Hero -->
      <section class="hero">
        <h1 class="hero-title">Minhas Receitas</h1>
        <p class="hero-subtitle">{{ totalReceitas() }} receita{{ totalReceitas() !== 1 ? 's' : '' }} cadastrada{{ totalReceitas() !== 1 ? 's' : '' }}</p>
      </section>

      <!-- Busca -->
      <div class="search-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          class="search-input"
          type="text"
          placeholder="Buscar receitas por nome..."
          [(ngModel)]="termoBusca"
          aria-label="Buscar receitas"
        />
        @if (termoBusca) {
          <button class="clear-btn" (click)="termoBusca = ''" aria-label="Limpar busca">✕</button>
        }
      </div>

      <!-- Loading -->
      @if (carregando()) {
        <div class="loading">
          <div class="spinner"></div>
          <p>Carregando receitas...</p>
        </div>
      }

      <!-- Lista de Receitas -->
      @if (!carregando()) {
        @if (receitasFiltradas().length > 0) {
          <div class="cards-grid">
            @for (receita of receitasFiltradas(); track receita.id) {
              <a [routerLink]="['/receita', receita.id]" class="card">
                <div class="card-header" [style.background]="getCategoriaColor(receita)">
                  <span class="categoria-badge">{{ getCategoriaLabel(receita) }}</span>
                  <span class="tempo">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {{ receita.tempoPreparo }} min
                  </span>
                </div>
                <div class="card-body">
                  <h2 class="card-title">{{ receita.nome }}</h2>
                  <p class="card-meta">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    {{ receita.porcoes }} {{ receita.porcoes === 1 ? 'porção' : 'porções' }}
                  </p>
                  <p class="card-ingredientes">{{ receita.ingredientes?.length || 0 }} ingredientes</p>
                </div>
                <div class="card-footer">
                  <span>Ver detalhes →</span>
                </div>
              </a>
            }
          </div>
        } @else {
          <div class="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 2l1.5 17.5L12 22l7.5-2.5L21 2H3z"/>
              <path d="M16 2v6a4 4 0 01-8 0V2"/>
            </svg>
            @if (termoBusca) {
              <p>Nenhuma receita encontrada para "<strong>{{ termoBusca }}</strong>"</p>
            } @else {
              <p>Nenhuma receita cadastrada</p>
              <a routerLink="/nova" class="btn btn-primary" style="margin-top: 16px">Cadastrar primeira receita</a>
            }
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .hero {
      margin-bottom: 32px;
    }
    .hero-title {
      font-family: var(--font-display);
      font-size: 2.4rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 4px;
    }
    .hero-subtitle {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    /* Search */
    .search-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: 12px;
      padding: 12px 16px;
      margin-bottom: 36px;
      color: var(--text-secondary);
      transition: border-color 0.2s;
    }
    .search-bar:focus-within {
      border-color: var(--accent);
      color: var(--accent);
    }
    .search-input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-size: 0.95rem;
      color: var(--text-primary);
    }
    .clear-btn {
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: 0.85rem;
      cursor: pointer;
    }

    /* Loading */
    .loading {
      text-align: center;
      padding: 60px;
      color: var(--text-secondary);
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--border);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Cards Grid */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }

    .card {
      background: var(--surface);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-hover);
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
    }
    .categoria-badge {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #fff;
      background: rgba(255,255,255,0.25);
      padding: 3px 10px;
      border-radius: 20px;
    }
    .tempo {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.9);
      font-weight: 500;
    }

    .card-body {
      padding: 18px 18px 12px;
      flex: 1;
    }
    .card-title {
      font-family: var(--font-display);
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 10px;
      line-height: 1.3;
    }
    .card-meta {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 4px;
    }
    .card-ingredientes {
      font-size: 0.82rem;
      color: var(--text-secondary);
    }

    .card-footer {
      padding: 12px 18px;
      border-top: 1px solid var(--border);
      font-size: 0.82rem;
      color: var(--accent);
      font-weight: 500;
    }
  `]
})
export class RecipeListComponent implements OnInit {
  receitas = signal<Recipe[]>([]);
  carregando = signal(true);
  termoBusca = '';

  totalReceitas = computed(() => this.receitas().length);

  receitasFiltradas = computed(() => {
    const termo = this.termoBusca.toLowerCase().trim();
    if (!termo) return this.receitas();
    return this.receitas().filter(r =>
      r.nome.toLowerCase().includes(termo)
    );
  });

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.listarTodas().subscribe({
      next: (data) => {
        this.receitas.set(data);
        this.carregando.set(false);
      },
      error: () => {
        this.carregando.set(false);
      }
    });
  }

  getCategoriaLabel(receita: Recipe): string {
    return CATEGORIA_LABELS[receita.categoria];
  }

  getCategoriaColor(receita: Recipe): string {
    return CATEGORIA_COLORS[receita.categoria];
  }
}
