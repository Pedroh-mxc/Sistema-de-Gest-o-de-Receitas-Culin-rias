import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe, CATEGORIA_LABELS, CATEGORIA_COLORS } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">

      <!-- Back -->
      <a routerLink="/" class="back-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Voltar para receitas
      </a>

      @if (carregando()) {
        <div class="loading">
          <div class="spinner"></div>
          <p>Carregando receita...</p>
        </div>
      }

      @if (!carregando() && !receita()) {
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          <p>Receita não encontrada</p>
          <a routerLink="/" class="btn btn-primary" style="margin-top:16px">Voltar</a>
        </div>
      }

      @if (!carregando() && receita(); as r) {
        <div class="detail-layout">

          <!-- Sidebar com info rápida -->
          <aside class="sidebar">
            <div class="badge-categoria" [style.background]="getCategoriaColor()">
              {{ getCategoriaLabel() }}
            </div>

            <div class="info-card">
              <div class="info-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <div>
                  <span class="info-label">Tempo de preparo</span>
                  <span class="info-value">{{ r.tempoPreparo }} minutos</span>
                </div>
              </div>

              <div class="info-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                </svg>
                <div>
                  <span class="info-label">Porções</span>
                  <span class="info-value">{{ r.porcoes }} {{ r.porcoes === 1 ? 'porção' : 'porções' }}</span>
                </div>
              </div>

              <div class="info-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <div>
                  <span class="info-label">Cadastrada em</span>
                  <span class="info-value">{{ formatarData(r.dataCadastro) }}</span>
                </div>
              </div>
            </div>

            <button class="btn btn-danger btn-excluir" (click)="confirmarExclusao()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
              Excluir Receita
            </button>
          </aside>

          <!-- Conteúdo principal -->
          <article class="main-content">
            <h1 class="receita-nome">{{ r.nome }}</h1>

            <!-- Ingredientes -->
            <section class="section">
              <h2 class="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 2l1.5 17.5L12 22l7.5-2.5L21 2H3z"/>
                  <path d="M16 2v6a4 4 0 01-8 0V2"/>
                </svg>
                Ingredientes
              </h2>
              <ul class="ingredientes-lista">
                @for (ingrediente of r.ingredientes; track $index) {
                  <li class="ingrediente-item">
                    <span class="ingrediente-bullet"></span>
                    {{ ingrediente }}
                  </li>
                }
              </ul>
            </section>

            <!-- Modo de Preparo -->
            <section class="section">
              <h2 class="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                Modo de Preparo
              </h2>
              <p class="modo-preparo">{{ r.modoPreparo }}</p>
            </section>
          </article>
        </div>
      }

      <!-- Modal de confirmação -->
      @if (mostrarModal()) {
        <div class="modal-overlay" (click)="cancelarExclusao()">
          <div class="modal" (click)="$event.stopPropagation()">
            <div class="modal-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </div>
            <h3>Excluir receita?</h3>
            <p>Esta ação não pode ser desfeita. A receita <strong>{{ receita()?.nome }}</strong> será removida permanentemente.</p>
            <div class="modal-actions">
              <button class="btn btn-ghost" (click)="cancelarExclusao()">Cancelar</button>
              <button class="btn btn-primary" style="background: var(--accent)" (click)="excluir()" [disabled]="excluindo()">
                @if (excluindo()) { Excluindo... } @else { Sim, excluir }
              </button>
            </div>
          </div>
        </div>
      }

      <!-- Toast -->
      @if (toastMsg()) {
        <div class="toast" [class]="toastClass()">{{ toastMsg() }}</div>
      }
    </div>
  `,
  styles: [`
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 28px;
      transition: color 0.2s;
    }
    .back-link:hover { color: var(--accent); }

    .loading {
      text-align: center;
      padding: 80px;
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

    /* Layout */
    .detail-layout {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 32px;
      align-items: start;
    }
    @media (max-width: 700px) {
      .detail-layout { grid-template-columns: 1fr; }
    }

    /* Sidebar */
    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: sticky;
      top: 90px;
    }
    .badge-categoria {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      color: #fff;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      text-align: center;
    }
    .info-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      color: var(--text-secondary);
    }
    .info-item > div {
      display: flex;
      flex-direction: column;
    }
    .info-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .info-value {
      font-size: 0.9rem;
      color: var(--text-primary);
      font-weight: 500;
      margin-top: 2px;
    }
    .btn-excluir {
      width: 100%;
      justify-content: center;
    }

    /* Main Content */
    .receita-nome {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 32px;
    }
    .section {
      margin-bottom: 32px;
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-display);
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--border);
    }
    .ingredientes-lista {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .ingrediente-item {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.95rem;
      color: var(--text-primary);
    }
    .ingrediente-bullet {
      width: 8px;
      height: 8px;
      background: var(--accent);
      border-radius: 50%;
      flex-shrink: 0;
    }
    .modo-preparo {
      white-space: pre-line;
      line-height: 1.8;
      color: var(--text-primary);
      font-size: 0.95rem;
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn { from { opacity: 0; } }
    .modal {
      background: var(--surface);
      border-radius: 16px;
      padding: 32px;
      max-width: 420px;
      width: 90%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      animation: slideUp 0.2s ease;
    }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } }
    .modal-icon {
      width: 64px;
      height: 64px;
      background: var(--accent-light);
      color: var(--accent);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }
    .modal h3 {
      font-family: var(--font-display);
      font-size: 1.4rem;
      margin-bottom: 10px;
    }
    .modal p {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: 24px;
      line-height: 1.6;
    }
    .modal-actions {
      display: flex;
      justify-content: center;
      gap: 12px;
    }
  `]
})
export class RecipeDetailComponent implements OnInit {
  receita = signal<Recipe | null>(null);
  carregando = signal(true);
  mostrarModal = signal(false);
  excluindo = signal(false);
  toastMsg = signal('');
  toastClass = signal('toast toast-success');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.buscarPorId(id).subscribe({
      next: (data) => {
        this.receita.set(data);
        this.carregando.set(false);
      },
      error: () => {
        this.carregando.set(false);
      }
    });
  }

  getCategoriaLabel(): string {
    const r = this.receita();
    return r ? CATEGORIA_LABELS[r.categoria] : '';
  }

  getCategoriaColor(): string {
    const r = this.receita();
    return r ? CATEGORIA_COLORS[r.categoria] : '';
  }

  formatarData(data?: string): string {
    if (!data) return '—';
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  }

  confirmarExclusao() {
    this.mostrarModal.set(true);
  }

  cancelarExclusao() {
    this.mostrarModal.set(false);
  }

  excluir() {
    const id = this.receita()?.id;
    if (!id) return;
    this.excluindo.set(true);
    this.recipeService.excluir(id).subscribe({
      next: () => {
        this.mostrarModal.set(false);
        this.mostrarToast('Receita excluída com sucesso!', 'success');
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: () => {
        this.excluindo.set(false);
        this.mostrarToast('Erro ao excluir receita', 'error');
      }
    });
  }

  private mostrarToast(msg: string, tipo: 'success' | 'error') {
    this.toastMsg.set(msg);
    this.toastClass.set(`toast toast-${tipo}`);
    setTimeout(() => this.toastMsg.set(''), 3000);
  }
}
